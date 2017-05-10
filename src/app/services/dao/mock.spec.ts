

import {DataDictionnary} from "./datadictionnary/datadictionary.impl";
import {DaoDef, DicoDef, FieldDef, FieldType, ObjectDef, StoreRegistryDef} from "./datadictionnary/conf.interface";
import {EdDaoIndexedDBAdapter} from "./adapter/indexeddb/indexeddb.adapter";

export class MockDAOConf implements DaoDef {
  dico: DicoDef;
  storeRegistry: StoreRegistryDef;

  constructor() {
    this.dico = {
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

    this.dico["Person"].fields = {
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
        objectDef: this.dico["Person"]
      },
      "PerOthersFriends": {
        type: FieldType.RESOURCE,
        name: "PerOthersFriends",
        isMultival: true,
        objectDef: this.dico["Person"]
      }
    };
    this.dico["Company"].fields = {};

    this.storeRegistry = {
      "*": [{
        name: "offline",
        isDefault: true,
        adapter: EdDaoIndexedDBAdapter.getInstance("UnittestDataBase") ,
        fieldAdapter: null
      }, {
        name: "online",
        adapter: null,
        fieldAdapter: null
      }]
    };
  }
}

export class MockDataDictionnary {
  private static instance: DataDictionnary;

  private static mockObjectDefinitions: { [objectName: string]: ObjectDef } = {
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

  private static mockFieldDefsPerObjectName: { [objectName: string]: { [fieldName: string]: FieldDef } } = {
    "Person": {
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
        objectDef: MockDataDictionnary.mockObjectDefinitions["Person"]
      },
      "PerOthersFriends": {
        type: FieldType.RESOURCE,
        name: "PerOthersFriends",
        isMultival: true,
        objectDef: MockDataDictionnary.mockObjectDefinitions["Person"]
      }
    },
    "Company": {}
  };


  public static getInstance(): DataDictionnary {
    if (this.instance == null) {
      this.instance = new DataDictionnary(new MockDAOConf().dico);
    }
    return this.instance;
  }
}
