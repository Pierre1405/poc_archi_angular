import {EdDaoRessourceFactory} from "./ressource/resource.impl";
import {DataDictionnary, MockDataDictionnary} from "./ressource/datadictionary.impl";
/**
 * Created by root on 19/04/17.
 */
describe("Test dao", function () {

  DataDictionnary.getInstance = MockDataDictionnary.getInstance;
  it("should create object resource", function (done) {
    const resource = EdDaoRessourceFactory.getInstance().getResource("Person", null);
    resource.setProperty("PerName", "Pierre");
    resource.write().subscribe(
      function () {

        const justSavedID = resource.getID();
        console.log(justSavedID);
        done();
      }
    );
  });
  it("should create collection resource", function () {

  });

  it("should load object resource", function () {

  });

  it("should load collection resource", function () {

  });

  it("should update object resource", function () {
    const resource = EdDaoRessourceFactory.getInstance().getResource("Person", null);
    resource.write().subscribe();
  });

  it("should update collection resource", function () {
    // check primitive
    // check object
    // check collection
  });

  it("should update id after creating resource", function () {
    // check primitive
    // check object
    // check collection
  });


  it("should create an update object resource tree", function () {

  });

  it("should create an update collection resource tree", function () {

  });

  it("should throw exception if using setObjectResouce on a primitive", function () {

  });

  it("should throw exception if using getCollectionResource on a primitive", function () {

  });

  it("should throw exception if using setProperty on an object resource", function () {

  });

  it("should throw exception if using getCollectionResource on an object resource", function () {

  });

  it("should throw exception if using setProperty on an collection resource", function () {

  });

  it("should throw exception if using setObjectResouce on an collection resource", function () {

  });
});
