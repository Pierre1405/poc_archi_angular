

import {DataDictionnary} from "./datadictionnary/datadictionary.impl";
import {FieldDef, FieldType, ObjectDef} from "./datadictionnary/conf.interface";
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
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: false
      },
      "PerFstName": {
        type: FieldType.STRING,
        name: "PerFstName",
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: false
      },
      "PerTitle": {
        type: FieldType.STRING,
        name: "PerTitle",
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: false
      },
      "PerName": {
        type: FieldType.STRING,
        name: "PerName",
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: false
      },
      "PerBestFriend": {
        type: FieldType.RESOURCE,
        name: "PerBestFriend",
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: false,
        objectDef: MockDataDictionnary.mockObjectDefinitions["Person"]
      },
      "PerOthersFriends": {
        type: FieldType.RESOURCE,
        name: "PerOthersFriends",
        ownerObjectDef: MockDataDictionnary.mockObjectDefinitions["Person"],
        isMultival: true,
        objectDef: MockDataDictionnary.mockObjectDefinitions["Person"]
      }
    },
    "Company": {}
  };


  public static getInstance(): DataDictionnary {
    if (this.instance == null) {
      this.instance = new DataDictionnary(MockDataDictionnary.mockObjectDefinitions,
        MockDataDictionnary.mockFieldDefsPerObjectName);
    }
    return this.instance;
  }
}
