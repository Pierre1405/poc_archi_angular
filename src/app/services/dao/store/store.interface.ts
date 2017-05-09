import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";

export interface EdDaoIStore {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readCollection(resource: EdDaoICollectionRessource<EdDaoIObjectResource>, filter: any, order: any, pagination: any): Observable<EdDaoICollectionRessource<EdDaoIObjectResource>>;
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource<EdDaoIObjectResource>)[]):Observable<(EdDaoIObjectResource|EdDaoICollectionRessource<EdDaoIObjectResource>)[]>;
}

export interface ResourceAdapter<T extends EdDaoIObjectResource> {
  persistanceToApplication (rawData: any): any;
  applicationToPersistance (rawData: any): any;
}
