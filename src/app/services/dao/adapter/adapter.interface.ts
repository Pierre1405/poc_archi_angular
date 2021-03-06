import {Observable} from "rxjs/Observable";
import {ApplicationRawData, PersistanceRawData} from "../store/store.impl";
import {EdDaoFilterGroup} from "../store/filter.interface";



export interface EdIAdapter {
  readResource(resourceID: string,
               resourceName: string):
                      Observable<PersistanceRawData>;
  readCollection(resourceName: string,
                 filter: EdDaoFilterGroup, order: any, pagination: any):
    Observable<PersistanceRawData[]>;

  saveResources(resources: PersistanceRawData[]): Observable<PersistanceRawData[]>;

  deleteResources(): Observable<any>;

  /**
   * Implement this method to adapt persistence data format to resource expected data format
   * i.e. timestamp to string, number id to string id, etc...
   * @param resourceName application resource name, can be use to handle some object specific format
   * @param persistanceResult the data for persistence
   */
  mapPersistanceData2ApplicationData(persistanceResult: PersistanceRawData): ApplicationRawData;

  /**
   * Implement this method to adapt resource data format to persistence expected data format
   * i.e. timestamp to string, number id to string id, etc...
   * @param resourceName application resource name, can be use to handle some object specific format
   * @param applicationResource
   */
  mapApplicationData2PersistanceData(applicationResource: ApplicationRawData): PersistanceRawData;

}
