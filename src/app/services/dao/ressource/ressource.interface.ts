
import {Observable} from "rxjs/Observable";
import {FieldDef} from "./datadictionary.impl";

export interface EdIObjectResource extends EdIReadable, EdIWritable, EdIRessource {
  read(): Observable<EdIObjectResource>;
  write(): Observable<EdIObjectResource>;

  getProperty(field: string): EdIPrimitiveRessource;
  setProperty(field: string, value: any);
  createProperty(field: string, property: EdIPrimitiveRessource);

  getResource(field: string): EdIObjectResource;
  setResource(fieldName: string, resourceID: string): void;
  createResource(field: string, property: EdIObjectResource);

  getCollectionResource(field: string): EdICollectionRessource;
  createCollectionResource(field: string, property: EdICollectionRessource);

  getID(): string;
  setID(id: string): void;
}

export interface EdICollectionRessource extends EdIReadable, EdIWritable, EdIRessource {
  read(): Observable<EdICollectionRessource>;
  write(): Observable<EdICollectionRessource>;

  setResources(resources: EdIObjectResource[]);
  getResources(): EdIObjectResource[];

  readSome(filter: any, pagination: any, order: any): Observable<EdICollectionRessource>;
  readNext(): Observable<EdICollectionRessource>;
  addResources(ids: string[]);
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
