export interface EdDaoFilterGroup {
  items: (EdDaoFilterItems|EdDaoFilterGroup)[];
  operator: EdDaoFilterGroupOperator;
}


export enum EdDaoFilterGroupOperator {
  OR, AND, GREATER_THAN
}

export interface EdDaoFilterItems {
  fieldName: string;
  value: string;
  operator: EdDaoFilterItemsOperator;
  not?: boolean;
}

export enum EdDaoFilterItemsOperator {
  EQUALS, LOWER_THAN, GREATER_THAN
}
