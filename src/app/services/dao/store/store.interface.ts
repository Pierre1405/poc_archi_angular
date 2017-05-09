import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";

export interface EdDaoIStore<C extends EdDaoICollectionRessource<O>, O extends EdDaoIObjectResource> {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readCollection(resource: C, filter: any, order: any, pagination: any): Observable<C>;
  saveResources(resources: (O|C)[]):Observable<(O|C)[]>;
}


export interface ResourceAdapter<T extends EdDaoIObjectResource> {
  persistanceToApplication (rawData: any): any;
  applicationToPersistance (rawData: any): any;
}
