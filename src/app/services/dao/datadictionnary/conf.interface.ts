export interface ObjectDef {
  name: string;
  fieldID: string;
  fields: {[fieldSqlName: string]: FieldDef};
  validation?: any[];
}

export interface FieldDef {
  type: FieldType;
  name: string;
  ownerObjectDef?: ObjectDef;
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
