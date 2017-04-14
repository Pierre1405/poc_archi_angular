import {Observable} from "rxjs";
import {EdDaoICollectionRessource, EdDaoIObjectResource, EdIRessource} from "../ressource/resource.interface";
import {DataDictionnary, FieldDef, FieldType, ObjectDef} from "../ressource/datadictionary.impl";


export interface RawData {
  [fieldName: string]: any;
};

export interface EdIAdapter {
  readResource(resource: EdDaoIObjectResource): Observable<EdDaoIObjectResource>;
  readResource(resourceID: string,
               resourceName: string):
                      Observable<RawData>;
  readCollection(resource: EdDaoICollectionRessource, filter: any, order: any, pagination: any): Observable<EdDaoICollectionRessource>;
  readCollection(resourceID: string,
               resourceName: string):
    Observable<RawData[]>;

  saveResources(resources: (EdDaoIObjectResource|EdDaoICollectionRessource)[]): Observable<any>;
  saveResources(resources: { resourceName: string, data: (RawData|RawData[])}[]): Observable<RawData|RawData[]>;
  /**
   * Implement this method to adapt persistence data format to resource expected data format
   * i.e. timestamp to string, number id to string id, etc...
   * @param resourceName application resource name, can be use to handle some object specific format
   * @param persistanceResult the data for persistence
   */
  mapResultDataToResourceFields(resourceName: string, persistanceResult: RawData): RawData;

  /**
   * Implement this method to adapt resource data format to persistence expected data format
   * i.e. timestamp to string, number id to string id, etc...
   * @param resourceName application resource name, can be use to handle some object specific format
   * @param applicationResource
   */
  mapResourceFieldsToResultData(resourceName: string, applicationResource: RawData): RawData;

}
