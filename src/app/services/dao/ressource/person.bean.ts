import {EdDaoUnknownObjectResource} from "./resource.impl";
export class Person extends EdDaoUnknownObjectResource {


  public getBestFriend(): Person {
    return <Person> this.getResource("bestFriend");
  }
}
