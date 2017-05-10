
import {SystemError} from "../../../common/error/errors";
import {DicoDef, FieldDef, ObjectDef} from "./conf.interface";
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

  constructor(private dataDictionnaryDef: DicoDef) {
    this.fillFieldDefinition();
  }

  protected fillFieldDefinition() {
    for (const objectName in this.dataDictionnaryDef) {
      if (this.dataDictionnaryDef.hasOwnProperty(objectName)) {
        const fieldsDef = this.dataDictionnaryDef[objectName].fields;
        for (const fieldName in fieldsDef) {
          if (fieldsDef.hasOwnProperty(fieldName)) {
            this.fieldDefinitions[fieldName] = fieldsDef[fieldName];
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

  public getObjectDefinitions(): DicoDef {
    return this.dataDictionnaryDef;
  }
}
