import {EdDaoRessourceFactory} from "./ressource/resource.impl";
import {DataDictionnary, MockDataDictionnary} from "./ressource/datadictionary.impl";
import {EdDaoIndexedDBAdapter} from "./adapter/indexeddb/indexeddb.adapter";
import {EdDaoICollectionRessource} from "./ressource/resource.interface";
/**
 * Created by root on 19/04/17.
 */
describe("Test dao", function () {
  DataDictionnary.getInstance = MockDataDictionnary.getInstance;

  const oldGetInstance = EdDaoIndexedDBAdapter.getInstance;
  EdDaoIndexedDBAdapter.getInstance = function () {
    return oldGetInstance("DaoIntegrationTest");
  };

  beforeEach(function(done) {
    const indexedDBAdapter = EdDaoIndexedDBAdapter.getInstance();
    indexedDBAdapter.clearAllTables().subscribe(
      function () {
        done();
      }
    );
  });

  it("should create object resource", function (done) {
    debugger;
    const resource = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource.setProperty("PerName", "Pierre");
    expect(resource.isRead()).not.toBeTruthy();
    resource.write().subscribe(
      function (resourcesFromObservable) {
        expect(resource.getID()).toBeTruthy();
        expect(resource.getID()).toBe(resourcesFromObservable.getID());
        expect(resource.isRead()).toBeTruthy();
        expect(resourcesFromObservable.isRead()).toBeTruthy();

        const justSavedID = resource.getID();
        const justSavedPerson = EdDaoRessourceFactory.getInstance().getResource("Person");
        justSavedPerson.read(justSavedID).subscribe(function (loadPerson) {
          expect(loadPerson.getProperty("PerName").getValue()).toBe("Pierre");
          done();
        }, function (error) {
          fail(error);
        });
      }
    );
  });
  it("should create collection resource", function (done) {
    debugger;
    const resource1 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource1.setProperty("PerName", "Test1");
    const resource2 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource2.setProperty("PerName", "Test2");
    const collectionRessourceCreation = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
    collectionRessourceCreation.getResources().push(resource1);
    collectionRessourceCreation.getResources().push(resource2);
    expect(collectionRessourceCreation.isRead()).not.toBeTruthy();
    expect(collectionRessourceCreation.getResources()[0].isRead()).not.toBeTruthy();
    expect(collectionRessourceCreation.getResources()[1].isRead()).not.toBeTruthy();
    collectionRessourceCreation.write().subscribe(
      function (theJustSavedCollection) {
        const assertCollectionRessource = function (collection: EdDaoICollectionRessource) {
          expect(collection.getResources()[0].getID()).toBeTruthy();
          expect(collection.getResources()[0].getProperty("PerName")).toBe("Test1");
          expect(collection.getResources()[1].getID()).toBeTruthy();
          expect(collection.getResources()[1].getProperty("PerName")).toBe("Test2");
          expect(collection.isRead()).not.toBeTruthy();
          expect(collection.getResources()[0].isRead()).not.toBeTruthy();
          expect(collection.getResources()[1].isRead()).not.toBeTruthy();
        };
        assertCollectionRessource(collectionRessourceCreation);
        assertCollectionRessource(theJustSavedCollection);
        const collectionRessourceLoadAfterCreation = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
        collectionRessourceLoadAfterCreation.read().subscribe(
          function() {
            done();
          },
          function() {
            fail("Error while read the collection after saving");
          }
        );
      },
      function() {
        fail("Error while saving the collection");
      }
    );
  });

  it("should load object resource", function () {

  });

  it("should load collection resource", function () {

  });

  it("should load a filtered collection resource", function () {

  });

  it("should update object resource", function () {
    const resource = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource.write().subscribe();
  });

  it("should update collection resource", function () {
    // check primitive
    // check object
    // check collection
  });

  it("should delete resource", function () {

  });

  it("should delete collection", function () {

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

  it("throw an exception if it deletes a resource with no ID", function () {

  });
});
