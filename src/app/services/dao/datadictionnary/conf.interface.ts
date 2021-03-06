import {EdIAdapter} from "../adapter/adapter.interface";
import {ResourceAdapter} from "../store/store.interface";
import {EdDaoIObjectResource} from "../ressource/resource.interface";
export interface DaoDef {
  dico: DicoDef;
  storeRegistry: StoreRegistryDef;
}

export interface DicoDef {
  [objectName: string]: ObjectDef;
}

export interface StoreRegistryDef {
  [objectName: string]: [StoreDef];
}

export interface StoreDef {
  isDefault?: boolean;
  name: String;
  adapter: EdIAdapter;
  fieldAdapter?: ResourceAdapter<EdDaoIObjectResource>;
}

export interface ObjectDef {
  name: string;
  fieldID: string;
  fields: {[fieldSqlName: string]: FieldDef};
  validation?: any[];
}

export interface FieldDef {
  type: FieldType;
  name: string;
  isMultival: boolean;
  objectDef?: ObjectDef;
}

export enum FieldType {
  STRING,
  NUMBER,
  DATE,
  DATETIME,
  RESOURCE
}
