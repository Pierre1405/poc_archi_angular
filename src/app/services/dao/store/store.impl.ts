import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";
import {EdDaoIndexedDBAdapter} from "../adapter/indexeddb/indexeddb.adapter";
import {EdIAdapter} from "../adapter/adapter.interface";
import {EdDaoIStore} from "./store.interface";
import {EdDaoRessourceFactory} from "../ressource/resource.impl";
import {FieldType} from "../datadictionnary/conf.interface";
import {EdDaoFilterGroup} from "./filter.interface";

export interface RawValues {
  [fieldName: string]: any;
}

export interface ApplicationRawData {
  resourceName: string;
  data: (RawValues|ApplicationRawData[]);
}
export interface PersistanceRawData {
  resourceName: string;
  data: (RawValues|PersistanceRawData[]);
}

// TODO Implement cache
export class EdDaoStore implements EdDaoIStore {


  private static instance: EdDaoStore;

  static getInstance(): EdDaoStore {
    if (EdDaoStore.instance == null) {
      EdDaoStore.instance = new EdDaoStore(EdDaoIndexedDBAdapter.getInstance());
    }
    return EdDaoStore.instance;
  }

  constructor(private adapter: EdIAdapter) {
  }

  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource> {
    return Observable.create( function (observer) {
      // read resource from persistence adapter
      const resourceName = resource.getMetaData().objectDef.name;
      const persistance$ = this.adapter.readResource(resource.getID(), resourceName);

      // When it's done translate persistence data to populate application resource
      persistance$.subscribe((persistanceRawData) => {
        this.populateObjectResourceWithRawData(resource, this.adapter.mapPersistanceData2ApplicationData(persistanceRawData));
        observer.next(resource);
      }, (error) => {
        observer.error(error);
      }, () => {
        observer.complete();
      });
    }.bind(this));

  }
  readCollection(collection: EdDaoICollectionRessource, filter: EdDaoFilterGroup, order: any, pagination: any):
                      Observable<EdDaoICollectionRessource> {
    return Observable.create( function (observer) {
      // read resource from persistence adapter
      const persistance$ = this.adapter.readCollection(collection.getMetaData().objectDef.name, filter, order, pagination);

      // When it's done translate persistence data to populate application resource
      persistance$.subscribe(function (persistenceData) {
        this.populateObjectCollectionWithRawData(collection, this.adapter.mapPersistanceData2ApplicationData(persistenceData));
        observer.next(collection);
      }.bind(this), (error) => {
        observer.error(error);
      }, () => {
        observer.complete();
      });
    }.bind(this));
  }
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource)[]):
                      Observable<(EdDaoIObjectResource|EdDaoICollectionRessource)[]> {
    return Observable.create( function (observer) {
      const persistanceRawData: PersistanceRawData[] = [];

      // Format application resource data to the persistence adapter expected format
      for (const resource of resources) {
        let rawData = null;
        if (resource.getMetaData().isMultival) {
          rawData = this.collectionResourcetoRawData(resource);
        } else {
          rawData = this.objectResourcetoRawData(resource);
        }
        persistanceRawData.push(this.adapter.mapApplicationData2PersistanceData(rawData));
      }

      const saveObservable = this.adapter.saveResources(persistanceRawData);
      saveObservable.subscribe(
        function() {
          try {
            for (let i = 0; i < persistanceRawData.length && i < resources.length; i++) {
              if (resources[i].getMetaData().isMultival) {
                this.populateObjectCollectionWithRawData(resources[i],
                  this.adapter.mapPersistanceData2ApplicationData(persistanceRawData[i]));
              } else {
                this.populateObjectResourceWithRawData(resources[i],
                  this.adapter.mapPersistanceData2ApplicationData(persistanceRawData[i]));
              }
            }
            observer.next(resources);
          } catch (e) {
            console.error(e);
            observer.error(e);
          }
        }.bind(this),
        function(error) {
          observer.error(error);
        }, () => {
          observer.complete();
        }
      );
    }.bind(this));
  }

  objectResourcetoRawData(resource: EdDaoIObjectResource): ApplicationRawData {
    const applicationRawData: ApplicationRawData = {
      resourceName: resource.getMetaData().objectDef.name,
      data: {}
    };
    const fields = resource.getMetaData().objectDef.fields;
    for (const fieldName in fields) {
      if (fields.hasOwnProperty(fieldName)) {
        if (fields[fieldName].type !== FieldType.RESOURCE) {
          applicationRawData.data[fieldName] = resource.getProperty(fieldName).getValue();
        } else {
          if (fields[fieldName].isMultival) {
            applicationRawData.data[fieldName] = resource.getCollectionResource(fieldName).getIDs();
          } else {
            applicationRawData.data[fieldName] = resource.getResource(fieldName).getID();
          }
        }
      }
    }
    return applicationRawData;
  }

  private populateObjectResourcePropertyWithRawData(resource: EdDaoIObjectResource, propertyName: string, data: any) {
    const objectDef = resource.getMetaData().objectDef;
    const fieldDef = objectDef.fields[propertyName];
    if (fieldDef.type !== FieldType.RESOURCE) {
      resource.setProperty(propertyName, data);
    } else {
      if (fieldDef.isMultival) {
        resource.getCollectionResource(propertyName).setIDs(data);
      } else {
        resource.getResource(propertyName).setID(data);
      }
    }
  }
  populateObjectResourceWithRawData(resource: EdDaoIObjectResource, rawData: ApplicationRawData) {
    for (const fieldName in rawData.data) {
      if (rawData.data.hasOwnProperty(fieldName)) {
        this.populateObjectResourcePropertyWithRawData(resource, fieldName, rawData.data[fieldName]);
      }
    }
    resource.setIsRead(true);
  }

  populateObjectCollectionWithRawData(collection: EdDaoICollectionRessource, rawData: ApplicationRawData) {
    const objectRawDatas: ApplicationRawData[] = <ApplicationRawData[]> rawData.data;
    const newCollectionResource: EdDaoIObjectResource[] = [];
    const resourceName: string = collection.getMetaData().objectDef.name;
    for (const objectRawData of objectRawDatas) {
      const objectResource = EdDaoRessourceFactory.getInstance().getResource(resourceName);
      this.populateObjectResourceWithRawData(objectResource, objectRawData);
      newCollectionResource.push(objectResource);
    }
    collection.setResources(newCollectionResource);
    collection.setIsRead(true);
  }

  collectionResourcetoRawData(collection: EdDaoICollectionRessource): ApplicationRawData {
    const result: ApplicationRawData = {
      resourceName: collection.getMetaData().objectDef.name,
        data: []
    };
    for (const objectResource of collection.getResources()) {
      (<RawValues[]> result.data).push(this.objectResourcetoRawData(objectResource));
    }
    return result;
  }
}
