import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";
import {EdDaoFilterGroup} from "./filter.interface";

export interface EdDaoIStore {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readCollection(resource: EdDaoICollectionRessource, filter: EdDaoFilterGroup, order: any, pagination: any): Observable<EdDaoICollectionRessource>;
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource)[]):
                              Observable<(EdDaoIObjectResource|EdDaoICollectionRessource)[]>;
}


export interface FieldAdapter  {
  persistanceToApplication (rawData: any): any;
  applicationToPersistance (rawData: any): any;
}
