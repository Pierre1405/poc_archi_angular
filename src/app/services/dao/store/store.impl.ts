import {EdDaoICollectionRessource, EdDaoIObjectResource} from "../ressource/resource.interface";
import {Observable} from "rxjs/Observable";
import {EdDaoIndexedDBAdapter} from "../adapter/indexeddb/indexeddb.adapter";
import {EdIAdapter} from "../adapter/adapter.interface";
import {EdDaoIStore} from "./store.interface";


export class EdDaoStore implements EdDaoIStore {


  private static instance: EdDaoStore;

  static getInstance(): EdDaoStore {
    if (EdDaoStore.instance == null) {
      EdDaoStore.instance = new EdDaoStore(EdDaoIndexedDBAdapter.getInstance());
    }
    return EdDaoStore.instance;
  }

  constructor(private adapter: EdIAdapter) {
  }

  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource> {
    throw new Error("Not implemented method");
  }
  readCollection(resource: EdDaoICollectionRessource, filter: any, order: any, pagination: any):
                      Observable<EdDaoICollectionRessource>{
    throw new Error("Not implemented method");
  }
  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource)[]):
                      Observable<(EdDaoIObjectResource|EdDaoICollectionRessource)[]>{
    throw new Error("Not implemented method");
  }

}
