

import {Observable} from "rxjs/Observable";
import {
  EdICollectionRessource, EdIObjectResource, EdIPrimitiveRessource, EdIRessource
} from "./ressource.interface";
import {EdIStore} from "../store/store.interface";
import {Injectable} from "@angular/core";
import {DataDictionnary, FieldDef, FieldType, ObjectDef} from "./datadictionary.impl";
import {EdIndexedDBStore} from "../store/sqlite/store.impl";

export class EdRessourceFactory {

  private static instance: EdRessourceFactory = new EdRessourceFactory();

  private store: EdIStore;

  public static getInstance (): EdRessourceFactory {
    return this.instance;
  }

  constructor() {
    // this.store = new EdFakeStore();
    this.store = new EdIndexedDBStore();
  }

  public getResource(type: string, id: string): EdIObjectResource {
    return new EdUnknownObjectResource(id, this.store, type);
  }

  public getCollectionRessource(type: string): EdICollectionRessource {
    return new EdUnknownCollectionResource(this.store, type, null);
  }

}

@Injectable()
export class EdUnknownObjectResource implements EdIObjectResource {

  private _isRead = false;
  private attributes: Object = {};
  private metadata: FieldDef;
  private id: string;


  constructor(id: string, private store: EdIStore, metaDataOrObjectName: (FieldDef|string)) {
    this.metadata = EdResourceUtils.getMetadataForConstructor(metaDataOrObjectName, false);
    this.setID(id);
  }

  public getStore(): EdIStore {
    return this.store;
  }

  public read(id?: string): Observable<EdIObjectResource> {
    if(id) {
      this.setID(id);
    }
    const observable = this.store.readResource(this);
    observable.subscribe(function () {
      this._isRead = true;
    }.bind(this));
    return observable;
  }

  isRead(): boolean {
    return this._isRead;
  }

  setIsRead(_isRead: boolean) {
    this._isRead = _isRead;
  }

  write(): Observable<EdIObjectResource> {
    throw new Error('Method not implemented.');
  }

  getProperty(field: string): EdIPrimitiveRessource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EDUnknowPrimitiveRessource(null, DataDictionnary.getInstance().getFieldDefinition(field));
    }
    return this.attributes[field];
  }

  setProperty(field: string, value: any) {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EDUnknowPrimitiveRessource(value, null);
    }
    const property: EdIPrimitiveRessource = this.attributes[field];
    property.setValue(value);


    const objRadical = (<ObjectDef> this.getMetaData().objectDef).radical;
    if (field === objRadical + "ID") {
      this.id = value;
    }
  }

  createProperty(field: string, property: EdIPrimitiveRessource) {
    this.attributes[field] = property;
  }

  getResource(field: string): EdIObjectResource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdUnknownObjectResource(null, this.store, DataDictionnary.getInstance().getFieldDefinition(field));
    }
    return this.attributes[field];
  }

  setResource(field: string, id) {
    this.attributes[field] = new EdUnknownObjectResource(id, this.store, DataDictionnary.getInstance().getFieldDefinition(field));
  }


  getID(): string {
    return this.id;
  }

  setID(id: string): void {
    this.id = id;
    const objRadical = (<ObjectDef> this.getMetaData().objectDef).radical;
    this.setProperty(objRadical + "ID", id);
  }

  getMetaData(): FieldDef {
    return this.metadata;
  }

  value(): any {
    return this.id;
  }

  createResource(field: string, property: EdIObjectResource) {
    this.attributes[field] = property;
  }

  getCollectionResource(fieldName: string): EdICollectionRessource {
    if (!this.attributes.hasOwnProperty(fieldName)) {
      this.attributes[fieldName] = new EdUnknownCollectionResource(this.store, DataDictionnary.getInstance().getFieldDefinition(fieldName), this.getID());
    }
    return this.attributes[fieldName];
  }

  createCollectionResource(field: string, property: EdICollectionRessource) {
    this.attributes[field] = property;
  }

  public toNonCircularObjectForJSON(): any {
    return EdResourceUtils.getNonCircularResourceForJson(this);
  }
}


@Injectable()
export class EdUnknownCollectionResource implements EdICollectionRessource {

  private resources: EdIObjectResource[] = [];
  private metaData: FieldDef;

  private _isRead = false;
  private ownerObjectID: string;



  constructor(private store: EdIStore, metaDataOrObjectName: (FieldDef|string), ownerObjectID) {
    this.metaData = EdResourceUtils.getMetadataForConstructor(metaDataOrObjectName, true);
    this.ownerObjectID = ownerObjectID;
  }


  read(): Observable<EdICollectionRessource> {
    const filter = {};
    if (this.ownerObjectID && this.getMetaData().propertyName) {
      filter[this.getMetaData().propertyName] = this.ownerObjectID;
    }
    const observable = this.store.readCollection(this, filter, null, null);
    return observable;
  }

  isRead(): boolean {
    return this._isRead;
  }

  setIsRead(_isRead: boolean) {
    this._isRead = _isRead;
  }

  write(): Observable<EdICollectionRessource> {
    throw new Error('Method not implemented.');
  }

  setResources(resources: EdIObjectResource[]) {
    this.resources = resources;
  }

  getResources(): EdIObjectResource[] {
    return this.resources;
  }

  addResources(ids: string[]) {
    for (const id of ids) {
      const newResource = new EdUnknownObjectResource(id, this.store, this.getMetaData());
      this.getResources().push(newResource);
    }
  }

  readSome(filter: any, pagination: any, order: any): Observable<EdICollectionRessource> {
    throw new Error('Method not implemented.');
  }

  readNext(): Observable<EdICollectionRessource> {
    throw new Error('Method not implemented.');
  }

  getMetaData(): FieldDef {
    return this.metaData;
  }
}


export class EDUnknowPrimitiveRessource implements EdIPrimitiveRessource {

  constructor (private value: any, private metadata: FieldDef) {

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


class EdResourceUtils {
  public static getMetadataForConstructor(metaDataOrObjectName: (FieldDef|string), isMultival: boolean): FieldDef {
    let metaData: FieldDef = null;
    if (typeof metaDataOrObjectName === "string") {
      metaData = {
        ownerObjectDef: null,
        isMultival: isMultival,
        propertyName: null,
        type: FieldType.RESOURCE,
        objectDef: DataDictionnary.getInstance().getObjectDefinition(<string>metaDataOrObjectName)

      };
    } else {
      metaData = <FieldDef>metaDataOrObjectName;
    }
    return metaData;
  }

  public static getNonCircularResourceForJson(resource: EdIObjectResource): any {
    const result = {};

    result["id"] = resource.getID();
    if (resource.isRead()) {
      const fieldDefs = (<ObjectDef> resource.getMetaData().objectDef).fields;
      for ( const fieldName in fieldDefs) {
        const fieldDef = fieldDefs[fieldName];
        if (fieldDef.type !== FieldType.RESOURCE) {
          const property = resource.getProperty(fieldName);
          result[fieldName] = property.getValue();
        } else {
          if (fieldDef.isMultival) {
            result[fieldName] = EdResourceUtils.getNonCircularCollectionForJson(resource.getCollectionResource(fieldName));
          } else {
            result[fieldName] = EdResourceUtils.getNonCircularResourceForJson(resource.getResource(fieldName));
          }
        }
      }
    }
    return result;
  }

  private static getNonCircularCollectionForJson(collectionResource: EdICollectionRessource): Array<any> {
    const result: Array<any> = new Array();
    for (const resource of collectionResource.getResources()) {
      result.push(EdResourceUtils.getNonCircularResourceForJson(resource));
    }
    return result;
  }
}
