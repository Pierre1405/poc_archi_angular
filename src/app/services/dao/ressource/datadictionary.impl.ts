
import {SystemError} from "../../../common/error/errors";



export interface ObjectDef {
  name: string;
  radical: string;
  fields: {[fieldSqlName: string]: FieldDef};
  nativeValidation?: any[];
}

export interface FieldDef {
  type: FieldType;
  name: string;
  ownerObjectDef?: ObjectDef;
  isMultival: boolean;
  objectDef?: ObjectDef;
  refCode?: string;
}

export enum FieldType {
  STRING,
  NUMBER,
  DATE,
  DATETIME,
  RESOURCE,
  REFERENTIEL
}


export class DataDictionnary {
  private static instance: DataDictionnary;


  protected fieldDefinitions: {[fieldName: string]: FieldDef} = {};

  public static getInstance(): DataDictionnary {
    if (this.instance == null) {
      this.instance = MockDataDictionnary.getInstance();
    }
    return this.instance;
  }

  constructor(private objectDefinitions?: {[objectName: string]: ObjectDef},
                        private fieldDefsPerObjectName?: {[objectName: string]: {[fieldName: string]: FieldDef}}) {
    this.fillFieldDefinition();
  }

  protected fillFieldDefinition() {
    for (const objectName in this.objectDefinitions) {
      if (this.objectDefinitions.hasOwnProperty(objectName)) {
        const objectFields = this.fieldDefsPerObjectName[objectName];
        const objectDef = this.objectDefinitions[objectName];
        objectDef.fields = objectFields;

        for (const fieldName in objectFields) {
          if (objectFields.hasOwnProperty(fieldName)) {
            this.fieldDefinitions[fieldName] = objectFields[fieldName];
          }
        }
      }
    }
  }

  public getObjectDefinition(objectName: string): ObjectDef {
    const result = this.getObjectDefinitions()[objectName];
    if (result == null) {
      throw new SystemError("Object not found " + objectName, null, objectName);
    }
    return result;
  }


  public getFieldDefinition(fieldName: string): FieldDef {
    const result = this.fieldDefinitions[fieldName];
    if (result == null) {
      throw new SystemError("Field not found " + fieldName, null, fieldName);
    }
    return result;
  }

  public getObjectDefinitions(): { [objectName: string]: ObjectDef } {
    return this.objectDefinitions;
  }
}




export class MockDataDictionnary {
  private static instance: DataDictionnary;

  private static mockObjectDefinitions: { [objectName: string]: ObjectDef } = {
    "Person": {
      name: "Person",
      radical: "Per",
      fields: {}
    },
    "Company": {
      name: "Company",
      radical: "Com",
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


