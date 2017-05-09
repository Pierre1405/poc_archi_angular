
import {Observable} from "rxjs/Observable";
import {FieldDef} from "../datadictionnary/conf.interface";

export interface EdDaoIObjectResource extends EdIReadable, EdIWritable, EdIRessource {
  read(id?: string): Observable<EdDaoIObjectResource>;
  write(): Observable<EdDaoIObjectResource>;
  deleteId(): Observable<any>;

  getProperty(field: string): EdIPrimitiveRessource;
  setProperty(field: string, value: any);
  createProperty(field: string, property: EdIPrimitiveRessource);

  getResource(field: string): EdDaoIObjectResource;
  setResource(fieldName: string, resourceID: string): void;
  createResource(field: string, property: EdDaoIObjectResource);

  getCollectionResource(field: string): EdDaoICollectionRessource<EdDaoIObjectResource>;
  createCollectionResource(field: string, property: EdDaoICollectionRessource<EdDaoIObjectResource>);

  getID(): string;
  setID(id: string): void;
}

export interface EdDaoICollectionRessource<T extends EdDaoIObjectResource> extends EdIReadable, EdIWritable, EdIRessource {
  read(): Observable<EdDaoICollectionRessource<T>>;
  write(): Observable<EdDaoICollectionRessource<T>>;
  deleteThem(filter?: any): Observable<any>;

  setResources(resources: T[]);
  getResources(): T[];

  readSome(filter: any, pagination: any, order: any): Observable<EdDaoICollectionRessource<T>>;
  readNext(): Observable<EdDaoICollectionRessource<T>>;
  setIDs(ids: string[]);
  getIDs(): string[];
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
