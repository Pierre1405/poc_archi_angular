import {DaoDef, DicoDef, FieldType, StoreRegistryDef} from "./datadictionnary/conf.interface";
import {EdDaoIndexedDBAdapter} from "./adapter/indexeddb/indexeddb.adapter";

const daoDico: DicoDef = {
  "Person": {
    name: "Person",
    fieldID: "PerID",
    fields: {}
  },
  "Company": {
    name: "Company",
    fieldID: "ComID",
    fields: {}
  }
};

daoDico["Person"].fields = {
  "PerID": {
    type: FieldType.STRING,
    name: "PerID",
    isMultival: false
  },
  "PerFstName": {
    type: FieldType.STRING,
    name: "PerFstName",
    isMultival: false
  },
  "PerTitle": {
    type: FieldType.STRING,
    name: "PerTitle",
    isMultival: false
  },
  "PerName": {
    type: FieldType.STRING,
    name: "PerName",
    isMultival: false
  },
  "PerBestFriend": {
    type: FieldType.RESOURCE,
    name: "PerBestFriend",
    isMultival: false,
    objectDef: daoDico["Person"]
  },
  "PerOthersFriends": {
    type: FieldType.RESOURCE,
    name: "PerOthersFriends",
    isMultival: true,
    objectDef: daoDico["Person"]
  }
};
daoDico["Company"].fields = {};

const storeRegistry: StoreRegistryDef = {
  "*": [{
    name: "offline",
    isDefault: true,
    adapter: EdDaoIndexedDBAdapter.getInstance("localDataBase") ,
    fieldAdapter: null
  },{
    name: "online",
    adapter: null,
    fieldAdapter: null
  }]
};

const daoConf: DaoDef = {
  dico: daoDico,
  storeRegistry: storeRegistry
};


