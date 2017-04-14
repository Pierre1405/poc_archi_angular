

import {EdIStore} from "../store.interface";
import {EdICollectionRessource, EdIObjectResource} from "../../ressource/ressource.interface";
import {ObjectUnsubscribedError, Observable} from "rxjs/Rx";
import {DataDictionnary, FieldType, ObjectDef} from "../../ressource/datadictionary.impl";

import {SystemError} from "../../../../common/error/errors";
import {EdUnknownCollectionResource, EdUnknownObjectResource} from "../../ressource/ressource.impl";
import {EdStoreUtils} from "../store.utils";

export class EdIndexedDBStore implements EdIStore {

  private static instances:{[dbName:string]: EdIndexedDBStore} = {};

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
        db.createObjectStore(objectDef.objectName, {keyPath: objectDef.radical + "ID", autoIncrement: true});
      }
    }
  }

  public static getInstance(dbName?:string) {
    dbName = dbName ? dbName : "localData";
    if(!EdIndexedDBStore.instances[dbName]) {
      EdIndexedDBStore.instances[dbName] = new EdIndexedDBStore(dbName);
    }
    return EdIndexedDBStore.instances[dbName];
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
        EdIndexedDBStore.createLocalDB(db);
      }.bind(this);
    }.bind(this));
    return this.openConnectionRequest$;
  }

  public clearAllTables(): Observable<any> {
    return Observable.create(function (observer) {
      const clearTableObservable: Observable<IDBObjectStore>[] = [];
      for (let i = 0; i < this.db.objectStoreNames.length; i++) {
        clearTableObservable.push(Observable.create(function (observer) {
          const objectName = this.db.objectStoreNames[i];
          const transaction = this.db.transaction(objectName, "readwrite");
          const objectStore = transaction.objectStore(objectName);

          debugger;
          let idbRequest = objectStore.clear();
          idbRequest.onerror = function() {
            observer.error();
          }
          idbRequest.onsuccess = function() {
            observer.next(objectStore);
            observer.complete();
          }
        }.bind(this)));
      }
      Observable.merge.apply(Observable, clearTableObservable).subscribe(function(v) {
        observer.next(v);
      },function(error) {
        observer.error(error);
      },function() {
        observer.complete();
      });
    }.bind(this));
  }

  readResource(resource: EdIObjectResource): Observable<EdIObjectResource> {
    if (!resource.getID()) {
      return Observable.empty();
    }
    return Observable.create(function (observable) {
      this.whenConnectionOpened(function (db) {
        const objectName = (<ObjectDef>resource.getMetaData().objectDef).objectName;
        const transaction = db.transaction(objectName);
        const objectStore = transaction.objectStore(objectName);

        const idbRequest = objectStore.get(EdIndexedDBStore.parseID(resource.getID()));
        idbRequest.onerror = function (ev) {
          observable.error(ev);
        };
        idbRequest.onsuccess = function () {
          const result: any = idbRequest.result;
          this.fillResourceWithIDBResult(resource, result);
          observable.next(resource);
          observable.complete();
        }.bind(this);
      }.bind(this), null, null);
    }.bind(this));
  }

  private fillResourceWithIDBResult(resource: EdIObjectResource, result: any) {
    const objectDef = (<ObjectDef> resource.getMetaData().objectDef);
    const fieldDefs = objectDef.fields;
    for (const fieldName in fieldDefs) {
      if (fieldDefs.hasOwnProperty(fieldName)) {
        const fieldDef = fieldDefs[fieldName];
        const dbValue = result[fieldName];
        if (fieldDef.type !== FieldType.RESOURCE) {
          resource.setProperty(fieldName, dbValue ? dbValue : null);
        } else {
          if (fieldDef.isMultival) {
            const newCollection: EdUnknownCollectionResource = new EdUnknownCollectionResource(this, fieldDef, resource.getID());
            resource.createCollectionResource(fieldName, newCollection);
          } else {
            const newResource: EdIObjectResource = new EdUnknownObjectResource(dbValue, this, fieldDef);
            resource.createResource(fieldName, newResource);
          }
        }
      }
    }
    const idFieldName = objectDef.radical + "ID";
    resource.setID(result[idFieldName]);
    resource.setIsRead(true);
  }

  readCollection(resource: EdICollectionRessource,
                 filter: {[fieldName: string]: any},
                 order: any,
                 pagination: any): Observable<EdICollectionRessource> {
    return Observable.create(function (observer) {
      this.whenConnectionOpened(function (db) {
        const objectName = (<ObjectDef>resource.getMetaData().objectDef).objectName;
        const transaction = db.transaction(objectName);
        const objectStore = transaction.objectStore(objectName);

        const idbRequest = objectStore.openCursor();
        idbRequest.onerror = function (ev) {
          observer.error(ev);
        };

        const result: EdIObjectResource[] = [];
        idbRequest.onsuccess = function (ev) {
          const cursor: IDBCursor = ev.target["result"];
          if (cursor) {
            const newResource: EdIObjectResource = new EdUnknownObjectResource(null, this, objectName);
            this.fillResourceWithIDBResult(newResource, cursor["value"]);
            result.push(newResource);
            cursor.continue();
          } else {
            resource.setResources(result);
            observer.next(resource);
            observer.complete();
          }
        }.bind(this);

      }.bind(this));
    }.bind(this));
  }

  saveResources(resources: (EdIObjectResource | EdICollectionRessource)[]): Observable<any> {
    return Observable.create(function (observer) {
      const allResource$: Observable<any>[] = [];
      for (const resource of resources) {
        if (resource.getMetaData().isMultival) {
          for (const resourceFromMultival of (<EdICollectionRessource>resource).getResources()) {
            allResource$.push(this.saveResource(resourceFromMultival));
          }
        } else {
          allResource$.push(this.saveResource(<EdIObjectResource> resource));
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

  private saveResource(resource: EdIObjectResource): Observable<EdIObjectResource> {
    return Observable.create(function(observer$) {
      this.whenConnectionOpened(function (db) {
        const objectName = (<ObjectDef>resource.getMetaData().objectDef).objectName;
        const transaction = db.transaction([objectName], "readwrite");
        transaction.oncomplete = function () {
          observer$.next(resource);
          observer$.complete();
        };
        transaction.onerror = function (ev) {
          observer$.error(ev);
        };
        transaction.onabort = function (ev) {
          observer$.error(ev);
        };
        const objectStore = transaction.objectStore(objectName);

        let request: IDBRequest;


        const newRecord = EdStoreUtils.instanceResourceToObject(resource);
        const objectRadical = (<ObjectDef> resource.getMetaData().objectDef).radical;
        if (resource.getID()) {
          newRecord[objectRadical + "ID"] = EdIndexedDBStore.parseID(newRecord[objectRadical + "ID"]);
          request = objectStore.put(newRecord);
        } else {
          delete newRecord[objectRadical + "ID"];
          request = objectStore.add(newRecord);
        }
        request.onsuccess = function (ev) {
          const id: string = ev.target["result"];
          resource.setID(id);
        };
      }.bind(this));
    }.bind(this));
  }

  private whenConnectionOpened(handler) {
    if(!this.openConnectionRequest$) { // The connexion hasn't been created yet or the DB deletion is in progress
      window.setTimeout(() => this.openDbConnection().subscribe (handler), 500);
    } else { // lets subscribe in case the db hasn't been created yet
      this.openConnectionRequest$.subscribe (handler);
    }
    return this.openConnectionRequest$;
  }
}

