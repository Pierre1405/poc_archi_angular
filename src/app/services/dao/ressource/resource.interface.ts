
import {Observable} from "rxjs/Observable";
import {FieldDef} from "./datadictionary.impl";

export interface EdDaoIObjectResource extends EdIReadable, EdIWritable, EdIRessource {
  read(): Observable<EdDaoIObjectResource>;
  write(): Observable<EdDaoIObjectResource>;

  getProperty(field: string): EdIPrimitiveRessource;
  setProperty(field: string, value: any);
  createProperty(field: string, property: EdIPrimitiveRessource);

  getResource(field: string): EdDaoIObjectResource;
  setResource(fieldName: string, resourceID: string): void;
  createResource(field: string, property: EdDaoIObjectResource);

  getCollectionResource(field: string): EdDaoICollectionRessource;
  createCollectionResource(field: string, property: EdDaoICollectionRessource);

  getID(): string;
  setID(id: string): void;

  populateWithObject(object: any);
  toObject(): any;
}

export interface EdDaoICollectionRessource extends EdIReadable, EdIWritable, EdIRessource {
  read(): Observable<EdDaoICollectionRessource>;
  write(): Observable<EdDaoICollectionRessource>;

  setResources(resources: EdDaoIObjectResource[]);
  getResources(): EdDaoIObjectResource[];

  readSome(filter: any, pagination: any, order: any): Observable<EdDaoICollectionRessource>;
  readNext(): Observable<EdDaoICollectionRessource>;
  addResources(ids: string[]);

  populateWithObject(object: any);
  toObject(): any;
}

export interface EdIPrimitiveRessource extends EdIRessource {
  getValue(): any;
  setValue(value: any);
}

export interface EdIRessource {
  getMetaData(): FieldDef;
}

export interface EdIReadable {
  isRead(): boolean;
  setIsRead(_isRead: boolean);
}

export interface EdIWritable {
}
