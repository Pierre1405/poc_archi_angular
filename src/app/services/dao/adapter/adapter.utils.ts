
import {EdDaoIObjectResource} from "../ressource/resource.interface";
import {DataDictionnary} from "../datadictionnary/datadictionary.impl";
import {FieldType} from "../datadictionnary/conf.interface";
//noinspection JSUnusedGlobalSymbols
export class EdDaoAdapterUtils {
  public static instanceResourceToObject(resource: EdDaoIObjectResource): any {
    const result = {};

    const objectDefinition = resource.getMetaData().objectDef;

    const fieldDefs = objectDefinition.fields;
    for (const fieldName in fieldDefs) {
      if (fieldDefs.hasOwnProperty(fieldName)) {
        result[fieldName] = this.resourceFieldToObject(fieldName, resource);
      }
    }
    return result;
  }

  private static resourceFieldToObject(fieldName, resource: EdDaoIObjectResource) {
    let fieldResult = null;
    const fieldDef = DataDictionnary.getInstance().getFieldDefinition(fieldName);

    if (fieldDef.type === FieldType.RESOURCE) {
      if (!fieldDef.isMultival) {
        fieldResult = resource.getResource(fieldName).getID();
      } else {
        fieldResult = [];
        const multivalresources = resource.getCollectionResource(fieldName).getResources();
        for (const multivalresource of multivalresources) {
          fieldResult.push(multivalresource.getID());
        }
      }
    } else {
      fieldResult = resource.getProperty(fieldName).getValue();
    }
    return fieldResult;
  }
}
