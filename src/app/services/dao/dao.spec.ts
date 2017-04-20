import {EdDaoRessourceFactory} from "./ressource/resource.impl";
import {DataDictionnary, MockDataDictionnary} from "./ressource/datadictionary.impl";
/**
 * Created by root on 19/04/17.
 */
describe("Test dao", function () {

  DataDictionnary.getInstance = MockDataDictionnary.getInstance;
  it("should create object resource", function (done) {
    debugger;
    const resource = EdDaoRessourceFactory.getInstance().getResource("Person", null);
    resource.setProperty("PerName", "Pierre");
    expect(resource.isRead()).not.toBeTruthy();
    resource.write().subscribe(
      function (resourcesFromObservable) {
        expect(resource.getID()).toBeTruthy();
        expect(resource.getID()).toBe(resourcesFromObservable.getID());
        expect(resource.isRead()).toBeTruthy();
        expect(resourcesFromObservable.isRead()).toBeTruthy();

        const justSavedID = resource.getID();
        const justSavedPerson = EdDaoRessourceFactory.getInstance().getResource("Person", justSavedID);
        justSavedPerson.read().subscribe(function (loadPerson) {
          expect(loadPerson.getProperty("PerName").getValue()).toBe("Pierre");
          done();
        }, function (error) {
          fail(error);
        });
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
