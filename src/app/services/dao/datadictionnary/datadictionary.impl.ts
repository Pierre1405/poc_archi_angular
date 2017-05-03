
import {SystemError} from "../../../common/error/errors";
import {FieldDef, ObjectDef} from "./conf.interface";
import {MockDataDictionnary} from "../mock.spec";






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
