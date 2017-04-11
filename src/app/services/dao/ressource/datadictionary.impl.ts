
import {SystemError} from "../../../common/error/errors";
export class DataDictionnary {

  private static instance: DataDictionnary;

  private objectDefinitions: {[objectName: string]: ObjectDef} = {
    "Person": {
      objectName: "Person",
      radical: "Per",
      fields: {
        "PerID": {
          type: FieldType.STRING,
          propertyName: "PerID",
          ownerObjectDef: "Person",
          isMultival: false
        },
        "PerFstName": {
          type: FieldType.STRING,
          propertyName: "PerFstName",
          ownerObjectDef: "Person",
          isMultival: false
        },
        "PerTitle": {
          type: FieldType.STRING,
          propertyName: "PerTitle",
          ownerObjectDef: "Person",
          isMultival: false
        },
        "PerName": {
          type: FieldType.STRING,
          propertyName: "PerName",
          ownerObjectDef: "Person",
          isMultival: false
        },
        "PerBestFriend": {
          type: FieldType.RESOURCE,
          propertyName: "PerBestFriend",
          ownerObjectDef: "Person",
          isMultival: false,
          objectDef: "Person"
        },
        "PerOthersFriends": {
          type: FieldType.RESOURCE,
          propertyName: "PerOthersFriends",
          ownerObjectDef: "Person",
          isMultival: true,
          objectDef: "Person"
        }
      }
    },
    "Company": {
      objectName: "Company",
      radical: "Com",
      fields: {

      }
    }
  };

  private _fieldDefinitions: {[fieldName: string]: FieldDef} = {};

  public static getInstance(): DataDictionnary {
    if (this.instance == null) {
      this.instance = new DataDictionnary();
    }
    return this.instance;
  }

  constructor() {
    for (const objectName in this.objectDefinitions) {
      if (this.objectDefinitions.hasOwnProperty(objectName)) {
        const objectDef = this.objectDefinitions[objectName];
        this._fieldDefinitions = Object.assign(this._fieldDefinitions, objectDef.fields);
        for (const fieldName in objectDef.fields) {
          if (objectDef.fields.hasOwnProperty(fieldName)) {
            const fieldDef = objectDef.fields[fieldName];
            if (fieldDef.objectDef != null) {
              fieldDef.objectDef = this.objectDefinitions[<string>fieldDef.objectDef];
            }
            if (fieldDef.ownerObjectDef != null) {
              fieldDef.ownerObjectDef = this.objectDefinitions[<string>fieldDef.ownerObjectDef];
            }
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
    const result = this._fieldDefinitions[fieldName];
    if (result == null) {
      throw new SystemError("Field not found " + fieldName, null, fieldName);
    }
    return result;
  }

  public getObjectDefinitions(): { [objectName: string]: ObjectDef } {
    return this.objectDefinitions;
  }
}


export interface ObjectDef {
  objectName: string;
  radical: string;
  fields: {[fieldSqlName: string]: FieldDef};
  nativeValidation?: any[];
}

export interface FieldDef {
  type: FieldType;
  propertyName: string;
  ownerObjectDef?: (ObjectDef|string);
  isMultival: boolean;
  nativeValidation?: any[];
  objectDef?: (ObjectDef|string);
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
