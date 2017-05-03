

import {Observable} from "rxjs/Observable";
import {
  EdDaoICollectionRessource, EdDaoIObjectResource, EdIPrimitiveRessource
} from "./resource.interface";
import {Injectable} from "@angular/core";
import {DataDictionnary} from "../datadictionnary/datadictionary.impl";
import {EdDaoIStore} from "../store/store.interface";
import {SystemError} from "../../../common/error/errors";
import {FieldDef, FieldType} from "../datadictionnary/conf.interface";
import {EdDaoStore} from "../store/store.impl";

export class EdDaoRessourceFactory {

  private static instance: EdDaoRessourceFactory = new EdDaoRessourceFactory();

  private store: EdDaoIStore;

  public static getInstance (): EdDaoRessourceFactory {
    return this.instance;
  }

  constructor() {
    this.store = EdDaoStore.getInstance();
  }

  public getResource(type: string): EdDaoIObjectResource {
    return new EdDaoUnknownObjectResource(this.store, type);
  }

  public getCollectionRessource(type: string): EdDaoICollectionRessource {
    return new EdDaoUnknownCollectionResource(this.store, type, null);
  }

}

// Todo detect on change
// TODO Implement is empty
@Injectable()
export class EdDaoUnknownObjectResource implements EdDaoIObjectResource {

  private _isRead = false;
  private attributes: Object = {};
  private metadata: FieldDef;
  private id: string;


  constructor(private store: EdDaoIStore, metaDataOrObjectName: (FieldDef|string)) {
    this.metadata = EdDaoResourceUtils.getMetadataForConstructor(metaDataOrObjectName, false);
  }



  public read(id?: string): Observable<EdDaoIObjectResource> {
    if (id) {
      this.setID(id);
    }
    return this.store.readResource(this);
  }

  isRead(): boolean {
    return this._isRead;
  }

  setIsRead(_isRead: boolean) {
    this._isRead = _isRead;
  }

  write(): Observable<EdDaoIObjectResource> {
    return Observable.create(function (observer) {
      this.store.saveResources([this]).subscribe(function() {
        observer.next(this);
      }.bind(this),
      function (error) {
        observer.error(error);
      },
      function () {
        observer.complete();
      }.bind(this));
    }.bind(this));
  }

  getProperty(field: string): EdIPrimitiveRessource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknowPrimitiveRessource(null, field);
    }
    return this.attributes[field];
  }

  setProperty(field: string, value: any) {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknowPrimitiveRessource(value, field);
    }
    const property: EdIPrimitiveRessource = this.attributes[field];
    property.setValue(value);


    const fieldIDName = this.getMetaData().objectDef.fieldID;
    if (field === fieldIDName) {
      this.id = value;
    }
  }

  createProperty(field: string, property: EdIPrimitiveRessource) {
    this.attributes[field] = property;
  }

  getResource(field: string): EdDaoIObjectResource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknownObjectResource(this.store, DataDictionnary.getInstance().getFieldDefinition(field));
    }
    return this.attributes[field];
  }

  setResource(field: string, id) {
    this.attributes[field] = new EdDaoUnknownObjectResource(this.store, DataDictionnary.getInstance().getFieldDefinition(field));
    this.attributes[field].setID(id);
  }


  getID(): string {
    return this.id;
  }

  setID(id: string): void {
    this.attributes = {};
    this.id = id;
    const fieldIDName = this.getMetaData().objectDef.fieldID;
    this.setProperty(fieldIDName, id);
    if (this.isRead()) {
      this.setIsRead(false);
      this.read();
    }
  }

  getMetaData(): FieldDef {
    return this.metadata;
  }

  value(): any {
    return this.id;
  }

  createResource(field: string, property: EdDaoIObjectResource) {
    this.attributes[field] = property;
  }

  getCollectionResource(fieldName: string): EdDaoICollectionRessource {
    if (!this.attributes.hasOwnProperty(fieldName)) {
      this.attributes[fieldName] = new EdDaoUnknownCollectionResource(
        this.store, DataDictionnary.getInstance().getFieldDefinition(fieldName),
        this.getID());
    }
    return this.attributes[fieldName];
  }

  createCollectionResource(field: string, property: EdDaoICollectionRessource) {
    this.attributes[field] = property;
  }

  public toNonCircularObjectForJSON(): any {
    return EdDaoResourceUtils.getNonCircularResourceForJson(this);
  }


  deleteId(): Observable<any> {
    throw new Error("Unimplemented method");
  }
}


@Injectable()
export class EdDaoUnknownCollectionResource implements EdDaoICollectionRessource {



  private resources: EdDaoIObjectResource[] = [];
  private metaData: FieldDef;

  private _isRead = false;
  private ownerObjectID: string;



  constructor(private store: EdDaoIStore, metaDataOrObjectName: (FieldDef|string), ownerObjectID) {
    this.metaData = EdDaoResourceUtils.getMetadataForConstructor(metaDataOrObjectName, true);
    this.ownerObjectID = ownerObjectID;
  }


  read(): Observable<EdDaoICollectionRessource> {
    const filter = {};
    if (this.ownerObjectID && this.getMetaData().name) {
      filter[this.getMetaData().name] = this.ownerObjectID;
    }
    return this.store.readCollection(this, filter, null, null);
  }

  isRead(): boolean {
    return this._isRead;
  }

  setIsRead(_isRead: boolean) {
    this._isRead = _isRead;
  }

  write(): Observable<EdDaoICollectionRessource> {
    return Observable.create(function (observer) {
      this.store.saveResources([this]).subscribe(function() {
        }.bind(this),
        function (error) {
          observer.error(error);
        },
        function () {
          observer.next(this);
          observer.complete();
        }.bind(this));
    }.bind(this));
  }

  deleteThem(filter?: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  setResources(resources: EdDaoIObjectResource[]) {
    this.resources = resources;
  }

  getResources(): EdDaoIObjectResource[] {
    return this.resources;
  }

  setIDs(ids: string[]) {
    this.setResources([]);
    for (const id of ids) {
      const newResource = new EdDaoUnknownObjectResource(this.store, this.getMetaData());
      newResource.setID(id);
      this.getResources().push(newResource);
    }
    if (this.isRead()) {
      this.setIsRead(false);
      this.read();
    }
  }

  getIDs(): string[] {
    const ids: string[] = [];
    for (const resource of this.resources) {
      ids.push(resource.getID());
    }
    return ids;
  }

  readSome(filter: any, pagination: any, order: any): Observable<EdDaoICollectionRessource> {
    throw new Error('Method not implemented.');
  }

  readNext(): Observable<EdDaoICollectionRessource> {
    throw new Error('Method not implemented.');
  }

  getMetaData(): FieldDef {
    return this.metaData;
  }
}


export class EdDaoUnknowPrimitiveRessource implements EdIPrimitiveRessource {
  private metadata: FieldDef;

  constructor (private value: any, fieldName: string) {
    this.metadata = DataDictionnary.getInstance().getFieldDefinition(fieldName);
  }

  getValue() {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
  }


  getMetaData(): FieldDef {
    return this.metadata;
  }
}


class EdDaoResourceUtils {

  public static getMetadataForConstructor(metaDataOrObjectName: (FieldDef|string), isMultival: boolean): FieldDef {

    if (!metaDataOrObjectName) {
      throw new SystemError("metaDataOrObjectName is null or empty, it's not possible to retrieve metadata to create the resource");
    }

    let metaData: FieldDef;
    if (typeof metaDataOrObjectName === "string") {
      metaData = {
        isMultival: isMultival,
        name: null,
        type: FieldType.RESOURCE,
        objectDef: DataDictionnary.getInstance().getObjectDefinition(<string>metaDataOrObjectName)
      };
      if (!metaData.objectDef) {
        throw new SystemError("Field " + (<string>metaDataOrObjectName) +
          " is not an object, check if the field exist or if it's a primitive", null, metaDataOrObjectName);
      }
    } else {
      metaData = <FieldDef>metaDataOrObjectName;

      if (!metaData.objectDef) {
        throw new SystemError("Field " + metaData.name + " is not an object", null, metaData);
      }
    }
    return metaData;
  }

  public static getNonCircularResourceForJson(resource: EdDaoIObjectResource): any {
    const result = {};

    result["id"] = resource.getID();
    if (resource.isRead()) {
      const fieldDefs = resource.getMetaData().objectDef.fields;
      for ( const fieldName in fieldDefs) {
        if (fieldDefs.hasOwnProperty(fieldName)) {
          const fieldDef = fieldDefs[fieldName];
          if (fieldDef.type !== FieldType.RESOURCE) {
            const property = resource.getProperty(fieldName);
            result[fieldName] = property.getValue();
          } else {
            if (fieldDef.isMultival) {
              result[fieldName] = EdDaoResourceUtils.getNonCircularCollectionForJson(resource.getCollectionResource(fieldName));
            } else {
              result[fieldName] = EdDaoResourceUtils.getNonCircularResourceForJson(resource.getResource(fieldName));
            }
          }
        }
      }
    }
    return result;
  }

  private static getNonCircularCollectionForJson(collectionResource: EdDaoICollectionRessource): Array<any> {
    const result: Array<any> = [];
    for (const resource of collectionResource.getResources()) {
      result.push(EdDaoResourceUtils.getNonCircularResourceForJson(resource));
    }
    return result;
  }
}
