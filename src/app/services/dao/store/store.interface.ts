import {Observable} from "rxjs";
import {EdICollectionRessource, EdIObjectResource, EdIRessource} from "../ressource/ressource.interface";
import {DataDictionnary, FieldDef, FieldType, ObjectDef} from "../ressource/datadictionary.impl";

export interface EdIStore {
  readResource(resource: EdIObjectResource): Observable<EdIObjectResource>;
  readCollection(resource: EdICollectionRessource, filter: any, order: any, pagination: any): Observable<EdICollectionRessource>;
  saveResources(resources: (EdIObjectResource|EdICollectionRessource)[]): Observable<any>;
}
