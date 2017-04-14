

import {Observable} from "rxjs/Observable";
import {
  EdDaoICollectionRessource, EdDaoIObjectResource, EdIPrimitiveRessource
} from "./resource.interface";
import {Injectable} from "@angular/core";
import {DataDictionnary, FieldDef, FieldType, ObjectDef} from "./datadictionary.impl";
import {EdDaoStore} from "../store/store.impl";
import {EdDaoIStore} from "../store/store.interface";

export class EdDaoRessourceFactory {

  private static instance: EdDaoRessourceFactory = new EdDaoRessourceFactory();

  private store: EdDaoIStore;

  public static getInstance (): EdDaoRessourceFactory {
    return this.instance;
  }

  constructor() {
    // this.store = new EdFakeStore();
    this.store = EdDaoStore.getInstance();
  }

  public getResource(type: string, id: string): EdDaoIObjectResource {
    return new EdDaoUnknownObjectResource(id, this.store, type);
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


  constructor(id: string, private store: EdDaoIStore, metaDataOrObjectName: (FieldDef|string)) {
    this.metadata = EdDaoResourceUtils.getMetadataForConstructor(metaDataOrObjectName, false);
    this.setID(id);
  }


  populateWithObject(object: any) {
    throw new Error('Method not implemented.');
  }

  toObject() {
    throw new Error('Method not implemented.');
  }

  public read(id?: string): Observable<EdDaoIObjectResource> {
    if (id) {
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

  write(): Observable<EdDaoIObjectResource> {
    throw new Error('Method not implemented.');
  }

  getProperty(field: string): EdIPrimitiveRessource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknowPrimitiveRessource(null, DataDictionnary.getInstance().getFieldDefinition(field));
    }
    return this.attributes[field];
  }

  setProperty(field: string, value: any) {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknowPrimitiveRessource(value, null);
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

  getResource(field: string): EdDaoIObjectResource {
    if (!this.attributes.hasOwnProperty(field)) {
      this.attributes[field] = new EdDaoUnknownObjectResource(null, this.store, DataDictionnary.getInstance().getFieldDefinition(field));
    }
    return this.attributes[field];
  }

  setResource(field: string, id) {
    this.attributes[field] = new EdDaoUnknownObjectResource(id, this.store, DataDictionnary.getInstance().getFieldDefinition(field));
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

  populateWithObject(object: any) {
    throw new Error('Method not implemented.');
  }

  toObject() {
    throw new Error('Method not implemented.');
  }


  read(): Observable<EdDaoICollectionRessource> {
    const filter = {};
    if (this.ownerObjectID && this.getMetaData().propertyName) {
      filter[this.getMetaData().propertyName] = this.ownerObjectID;
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
    throw new Error('Method not implemented.');
  }

  setResources(resources: EdDaoIObjectResource[]) {
    this.resources = resources;
  }

  getResources(): EdDaoIObjectResource[] {
    return this.resources;
  }

  addResources(ids: string[]) {
    for (const id of ids) {
      const newResource = new EdDaoUnknownObjectResource(id, this.store, this.getMetaData());
      this.getResources().push(newResource);
    }
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

  // TODO: metadata should be settable with fieldName
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


class EdDaoResourceUtils {

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

  public static getNonCircularResourceForJson(resource: EdDaoIObjectResource): any {
    const result = {};

    result["id"] = resource.getID();
    if (resource.isRead()) {
      const fieldDefs = (<ObjectDef> resource.getMetaData().objectDef).fields;
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
