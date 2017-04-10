
import {EdIObjectResource} from "../ressource/ressource.interface";
import {DataDictionnary, FieldType, ObjectDef} from "../ressource/datadictionary.impl";
export class EdStoreUtils {
  public static instanceResourceToObject(resource: EdIObjectResource): any {
    const result = {};

    const objectDefinition = <ObjectDef>resource.getMetaData().objectDef;

    const fieldDefs = objectDefinition.fields;
    for (const fieldName in fieldDefs) {
      if (fieldDefs.hasOwnProperty(fieldName)) {
        result[fieldName] = this.resourceFieldToObject(fieldName, resource);
      }
    }
    return result;
  }

  private static resourceFieldToObject(fieldName, resource: EdIObjectResource) {
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
