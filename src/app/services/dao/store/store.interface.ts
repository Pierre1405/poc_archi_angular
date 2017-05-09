import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";
import {EdDaoFilterGroup} from "./filter.interface";

export interface EdDaoIStore {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readCollection(resource: EdDaoICollectionRessource<EdDaoIObjectResource>, filter: EdDaoFilterGroup, order: any, pagination: any): Observable<EdDaoICollectionRessource<EdDaoIObjectResource>>;
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource<EdDaoIObjectResource>)[]):Observable<(EdDaoIObjectResource|EdDaoICollectionRessource<EdDaoIObjectResource>)[]>;
}

export interface ResourceAdapter<T extends EdDaoIObjectResource> {
  persistanceToApplication (rawData: any): any;
  applicationToPersistance (rawData: any): any;
}
