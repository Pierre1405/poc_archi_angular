import {DaoDef} from "./datadictionnary/conf.interface";
import {DataDictionnary} from "./datadictionnary/datadictionary.impl";
import {EdDaoIObjectResource} from "./ressource/resource.interface";
import {EdDaoUnknownObjectResource} from "./ressource/resource.impl";
export class DaoService {
  private static configuration: DaoDef;
  private static dataDictionnary: DataDictionnary;


  public static init(conf: DaoDef) {
    DaoService.configuration = conf;

    this.dataDictionnary = new DataDictionnary(conf.dico);
  }


  public static getResource<T extends EdDaoUnknownObjectResource> (): T {
    return <T> new EdDaoUnknownObjectResource(null, null);
  }
}
