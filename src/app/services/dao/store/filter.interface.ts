export abstract class EdDaoFilterGroup {
  assertions: Array<EdDaoFilterAssertion|EdDaoFilterGroup>;
  operator: EdDaoFilterGroupOperator;
}


export enum EdDaoFilterGroupOperator {
  OR, AND, GREATER_THAN
}

export abstract class EdDaoFilterAssertion {
  fieldName: string;
  value: string;
  operator?: EdDaoFilterAssertionOperators;
  not?: boolean;
}

export enum EdDaoFilterAssertionOperators {
  EQUALS, LOWER_THAN, GREATER_THAN
}
