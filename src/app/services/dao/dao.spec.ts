import {EdDaoRessourceFactory} from "./ressource/resource.impl";
import {DataDictionnary} from "./datadictionnary/datadictionary.impl";
import {EdDaoIndexedDBAdapter} from "./adapter/indexeddb/indexeddb.adapter";
import {EdDaoICollectionRessource, EdDaoIObjectResource} from "./ressource/resource.interface";
import {MockDataDictionnary} from "./mock.spec";
import {EdDaoStore} from "./store/store.impl";
import {EdDaoFilterGroupOperator} from "app/services/dao/store/filter.interface";


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

  it("should create and load object resource", function (done) {
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
  it("should create and load collection resource", function (done) {
    const resource1 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource1.setProperty("PerName", "Test1");
    const resource2 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource2.setProperty("PerName", "Test2");
    const collectionRessourceCreation = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
    collectionRessourceCreation.getResources().push(resource1);
    collectionRessourceCreation.getResources().push(resource2);
    expect(collectionRessourceCreation.isRead()).not.toBeTruthy("Collection shouldn't be read");
    expect(collectionRessourceCreation.getResources()[0].isRead()).not.toBeTruthy("Collection item 1 shouldn't be read");
    expect(collectionRessourceCreation.getResources()[1].isRead()).not.toBeTruthy("Collection item 2 shouldn't be read");

    collectionRessourceCreation.write().subscribe(
      function (theJustSavedCollection) {
        const assertCollectionRessource = function (collection: EdDaoICollectionRessource<EdDaoIObjectResource>) {
          try {
            expect(collection.getResources()[0].getID()).toBeTruthy();
            expect(collection.getResources()[0].getProperty("PerName").getValue()).toBe("Test1");
            expect(collection.getResources()[1].getID()).toBeTruthy();
            expect(collection.getResources()[1].getProperty("PerName").getValue()).toBe("Test2");
            expect(collection.isRead()).toBeTruthy("Collection should be read");
            expect(collection.getResources()[0].isRead()).toBeTruthy("Collection item 1 should be read");
            expect(collection.getResources()[1].isRead()).toBeTruthy("Collection item 2 should be read");
          } catch (e) {
            fail(e);
          }
        };
        assertCollectionRessource(collectionRessourceCreation);
        assertCollectionRessource(theJustSavedCollection);
        const collectionRessourceLoadAfterCreation = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
        collectionRessourceLoadAfterCreation.read().subscribe(
          function(collectionRessourceLoadAfterCreationFromSubscriber) {
            assertCollectionRessource(collectionRessourceLoadAfterCreation);
            assertCollectionRessource(collectionRessourceLoadAfterCreationFromSubscriber);
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

  it("should update object resource", function () {
  });

  it("should update collection resource", function () {
    // check primitive
    // check object
    // check collection
  });

  const prepareCollectionForFilterTest = function (handler) {
    const resource1 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource1.setProperty("PerName", "ShouldBeFound");
    const resource2 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource2.setProperty("PerName", "ShouldBeFound");
    const resource3 = EdDaoRessourceFactory.getInstance().getResource("Person");
    resource3.setProperty("PerName", "ShouldNotBeFound");
    EdDaoStore.getInstance().saveResources([resource1, resource2, resource3]).subscribe(
      null,
      () => {
        fail("not able to prepare data for test");
      },
      handler
    );
  };

  it("should load a none filtered collection resource if filter is null", function (done) {
    prepareCollectionForFilterTest(
      function() {
        const collectionFromFactory = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
        collectionFromFactory.readSome(null).subscribe(function (collectionFromObserver) {
            expect(collectionFromFactory.getResources().length).toBe(3);
            expect(collectionFromObserver.getResources().length).toBe(3);
            done();
          },
          fail);
      });
  });

  it("should load a filtered collection resource", function (done) {
    prepareCollectionForFilterTest(
      function() {
        const collectionFromFactory = EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
        collectionFromFactory.readSome({
          operator: EdDaoFilterGroupOperator.AND,
          assertions: [{
            fieldName: "PerName",
            value: "ShouldBeFound"
          }]
        }).subscribe(function (collectionFromObserver) {
            expect(collectionFromFactory.getResources().length).toBe(2);
            expect(collectionFromObserver.getResources().length).toBe(2);
            done();
          },
          fail);
      });
  });


  it("should load a % filtered collection resource", function () {
  });
  it("should paginate collection resource", function () {
  });
  it("should order collection resource", function () {
  });
  it("should filtered, order and paginate collection resource", function () {
  });

  it("should delete resource", function () {

  });

  it("should delete collection", function () {

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
