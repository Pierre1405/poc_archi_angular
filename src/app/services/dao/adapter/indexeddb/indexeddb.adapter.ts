

import {EdIAdapter} from "../adapter.interface";
import {DataDictionnary} from "../../ressource/datadictionary.impl";

import {SystemError} from "../../../../common/error/errors";
import {Observable} from "rxjs";
import {ApplicationRawData, PersistanceRawData} from "../../store/store.impl";

export class EdDaoIndexedDBAdapter implements EdIAdapter {


  private static instances: {[dbName: string]: EdDaoIndexedDBAdapter} = {};

  private openConnectionRequest$: Observable<IDBDatabase> = Observable.create();
  private db: IDBDatabase = null;

  private static parseID(id: string) {
    return parseInt(id, 10);
  }

  private static createLocalDB(db: IDBDatabase) {
    const instance = DataDictionnary.getInstance();
    for (const objectName in instance.getObjectDefinitions()) {
      if (instance.getObjectDefinitions().hasOwnProperty(objectName)) {
        const objectDef = instance.getObjectDefinitions()[objectName];
        db.createObjectStore(objectDef.name, {keyPath: objectDef.fieldID, autoIncrement: true});
      }
    }
  }

  public static getInstance(dbName?: string) {
    dbName = dbName ? dbName : "localData";
    if (!EdDaoIndexedDBAdapter.instances[dbName]) {
      EdDaoIndexedDBAdapter.instances[dbName] = new EdDaoIndexedDBAdapter(dbName);
    }
    return EdDaoIndexedDBAdapter.instances[dbName];
  }

  private constructor (private dbName: string) {
    this.openDbConnection().subscribe(
      function (db) {
        console.log("Connected to local base", db);
        this.db = db;
      }.bind(this),
      function () {
        console.log("Error while connecting to local DB", arguments);
      }
    );

  }

  private openDbConnection(): Observable<IDBDatabase> {
    this.openConnectionRequest$ = Observable.create(function (observable) {
      const openRequest = window.indexedDB.open(this.dbName, 1);
      openRequest.onsuccess = function (ev: Event) {
        observable.next(<IDBDatabase>(<any>ev.target).result);
      };
      openRequest.onerror = function (ev: Event) {
        observable.error(new SystemError("Not able to open DB", null, ev));
      };
      openRequest.onblocked = function (ev: Event) {
        observable.error(new SystemError("Not able to open DB, a connection is already opened", null, ev));
      };
      openRequest.onupgradeneeded = function (ev: IDBVersionChangeEvent) {
        const db: IDBDatabase = (<any>ev.target).result;
        EdDaoIndexedDBAdapter.createLocalDB(db);
      }.bind(this);
    }.bind(this));
    return this.openConnectionRequest$;
  }

  public clearAllTables(): Observable<any> {
    return Observable.create(function (observer) {
      this.whenConnectionOpened(function () {
        const clearTableObservable: Observable<IDBObjectStore>[] = [];
        for (let i = 0; i < this.db.objectStoreNames.length; i++) {
          clearTableObservable.push(Observable.create(function (clearTableObserver) {
            const objectName = this.db.objectStoreNames[i];
            const transaction = this.db.transaction(objectName, "readwrite");
            const objectStore = transaction.objectStore(objectName);

            const idbRequest = objectStore.clear();
            idbRequest.onerror = function() {
              clearTableObserver.error();
            };
            idbRequest.onsuccess = function() {
              clearTableObserver.next(objectStore);
              clearTableObserver.complete();
            };
          }.bind(this)));
        }
        Observable.merge.apply(Observable, clearTableObservable).subscribe(function(v) {
          observer.next(v);
        }, function(error) {
          observer.error(error);
        }, function() {
          observer.complete();
        });
      }.bind(this));
    }.bind(this));
  }

  readResource(resourceID: string, resourceName: string): Observable<PersistanceRawData> {
    if (!resourceID) {
      return Observable.empty();
    }
    return Observable.create(function (observable) {
      this.whenConnectionOpened(function (db) {
        const transaction = db.transaction(resourceName);
        const objectStore = transaction.objectStore(resourceName);

        const idbRequest = objectStore.get(EdDaoIndexedDBAdapter.parseID(resourceID));
        idbRequest.onerror = function (ev) {
          observable.error(ev);
        };
        idbRequest.onsuccess = function () {
          const result: PersistanceRawData = {
            resourceName: resourceName,
            data: idbRequest.result
          };

          observable.next(result);
          observable.complete();
        }.bind(this);
      }.bind(this), null, null);
    }.bind(this));
  }

  // TODO implement filter
  readCollection(resourceName: string,
                 filter: any, order: any, pagination: any): Observable<PersistanceRawData[]> {
    return Observable.create(function (observer) {
      this.whenConnectionOpened(function (db) {
        const transaction = db.transaction(resourceName);
        const objectStore = transaction.objectStore(resourceName);

        const idbRequest = objectStore.openCursor();
        idbRequest.onerror = function (ev) {
          observer.error(ev);
        };

        const result: PersistanceRawData[] = [];
        idbRequest.onsuccess = function (ev) {
          const cursor: IDBCursor = ev.target["result"];
          if (cursor) {
            const persistanceData: PersistanceRawData = {
              resourceName: resourceName,
              data: cursor["value"]
            };
            result.push(persistanceData);
            cursor.continue();
          } else {
            observer.next(result);
            observer.complete();
          }
        }.bind(this);

      }.bind(this));
    }.bind(this));
  }

  saveResources(resources: PersistanceRawData[]): Observable<PersistanceRawData[]> {
    return Observable.create(function (observer) {
      const allResource$: Observable<any>[] = [];
      for (const resource of resources) {
        if (resource.data instanceof Array) {
          for (const oneData of resource.data) {
            allResource$.push(this.saveResource({
              resourceName: resource.resourceName,
              data: oneData
            }));
          }
        } else {
          allResource$.push(this.saveResource(resource));
        }
      }
      if (allResource$.length > 0) {
        const resources$ = Observable.merge.apply(Observable, allResource$);
        resources$.subscribe(function (resource) {
          observer.next(resource);
        }, function () {
          observer.error(arguments);
        }, function () {
          observer.complete();
        }.bind(this));
      } else {
        observer.complete();
      }

    }.bind(this));
  }


  private saveResource(persistanceRawData: PersistanceRawData): Observable<PersistanceRawData> {
    return Observable.create(function(observer$) {
      this.whenConnectionOpened(function (db) {
        const transaction = db.transaction(persistanceRawData.resourceName, "readwrite");
        transaction.onerror = function (ev) {
          observer$.error(ev);
        };
        transaction.onabort = function (ev) {
          observer$.error(ev);
        };
        const objectStore = transaction.objectStore(persistanceRawData.resourceName);

        let request: IDBRequest;


        const fieldIDName = DataDictionnary.getInstance().getObjectDefinition(persistanceRawData.resourceName).fieldID;
        if (!persistanceRawData.data[fieldIDName]) {
          delete persistanceRawData.data[fieldIDName];
        }
        request = objectStore.put(persistanceRawData.data);
        request.onsuccess = function (ev) {
          persistanceRawData.data[fieldIDName] = ev.target["result"];
          observer$.next(persistanceRawData);
          observer$.complete();
        };
      }.bind(this));
    }.bind(this));
  }

  deleteResources(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private whenConnectionOpened(handler) {
    if (!this.openConnectionRequest$) { // The connexion hasn't been created yet or the DB deletion is in progress
      window.setTimeout(() => this.openDbConnection().subscribe (handler), 500);
    } else { // lets subscribe in case the db hasn't been created yet
      this.openConnectionRequest$.subscribe (handler);
    }
    return this.openConnectionRequest$;
  }

  mapPersistanceData2ApplicationData(persistanceResult: PersistanceRawData): ApplicationRawData {
    return <ApplicationRawData> persistanceResult;
  }

  mapApplicationData2PersistanceData(applicationResource: ApplicationRawData): PersistanceRawData {
    return <PersistanceRawData> applicationResource;
  }

}

