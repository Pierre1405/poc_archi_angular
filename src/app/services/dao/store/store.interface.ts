import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";

export interface EdDaoIStore {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readCollection(resource: EdDaoICollectionRessource, filter: any, order: any, pagination: any): Observable<EdDaoICollectionRessource>;
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource)[]):
                              Observable<(EdDaoIObjectResource|EdDaoICollectionRessource)[]>;
}


export interface FieldAdapter  {
  persistanceToApplication (rawData: any): any;
  applicationToPersistance (rawData: any): any;
}
