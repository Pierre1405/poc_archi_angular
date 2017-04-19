import {EdDaoUnknownCollectionResource, EdDaoUnknownObjectResource} from "../../ressource/resource.impl";
import {Observable} from "rxjs/Observable";
import {EdDaoIndexedDBAdapter} from "./indexeddb.adapter";
/*
describe('save and read indexed DB', () => {

  let createdPerson1 = null;
  let createdPerson2 = null;
  const store = EdDaoIndexedDBAdapter.getInstance("unitTest");

  beforeEach(function () {
    createdPerson1 = new EdDaoUnknownObjectResource(null, store, "Person");
    createdPerson1.setProperty("PerFstName", "Pierrot");
    createdPerson1.setProperty("PerName", "Delaluna");
    createdPerson1.setProperty("PerTitle", "El");

    createdPerson2 = new EdDaoUnknownObjectResource(null, store, "Person");
    createdPerson2.setProperty("PerFstName", "Pierrot2");

    createdPerson2.setProperty("PerName", "Delaluna2");

    createdPerson2.setProperty("PerTitle", "El2");
  });

  // TODO implement reset database
  afterEach(function (done) {
    store.clearAllTables().subscribe(
      done
    );
  });

  const assertCreation = function (done) {
    const loadResource1 = new EdDaoUnknownObjectResource(createdPerson1.getID(), store, "Person");
    const loadResource2 = new EdDaoUnknownObjectResource(createdPerson2.getID(), store, "Person");
    const loadResource1$ = store.readResource(loadResource1);
    const loadResource2$ = store.readResource(loadResource2);
    loadResource1$.subscribe(function (dispatchedResource) {
      expect(dispatchedResource.getProperty("PerFstName").getValue()).toEqual("Pierrot");
      expect(dispatchedResource.getProperty("PerName").getValue()).toEqual("Delaluna");
      expect(dispatchedResource.getProperty("PerTitle").getValue()).toEqual("El");
      expect(loadResource1.getProperty("PerFstName").getValue()).toEqual("Pierrot");
      expect(loadResource1.getProperty("PerName").getValue()).toEqual("Delaluna");
      expect(loadResource1.getProperty("PerTitle").getValue()).toEqual("El");
    }.bind(this));
    loadResource2$.subscribe(function (dispatchedResource) {
      expect(dispatchedResource.getProperty("PerFstName").getValue()).toEqual("Pierrot2");
      expect(dispatchedResource.getProperty("PerName").getValue()).toEqual("Delaluna2");
      expect(dispatchedResource.getProperty("PerTitle").getValue()).toEqual("El2");
      expect(loadResource2.getProperty("PerFstName").getValue()).toEqual("Pierrot2");
      expect(loadResource2.getProperty("PerName").getValue()).toEqual("Delaluna2");
      expect(loadResource2.getProperty("PerTitle").getValue()).toEqual("El2");
    }.bind(this));

    Observable.merge(loadResource1$, loadResource2$).subscribe(
      null,
      function (error) {
        console.log(error);
        fail(error.toString());
      },
      function () {
        done();
      }
    );
  };


  it('should create a collection', function(done) {
    const collection = new EdDaoUnknownCollectionResource(store, "Person", null);
    collection.getResources().push(createdPerson1);
    collection.getResources().push(createdPerson2);

    store.saveResources([collection]).subscribe(
      null,
      function (error) {
        console.log(error);
        fail(error.toString());
      },
      function () {
        expect(createdPerson1.getID()).toBeTruthy();
        expect(createdPerson2.getID()).toBeTruthy();
        assertCreation.call(this, done);
      }.bind(this)
    );
  });


  it('create 2 objects', function(done) {
    store.saveResources([createdPerson1, createdPerson2]).subscribe(
      null,
      function (error) {
        console.log(error);
        fail(error.toString());
      },
      function () {
        expect(createdPerson1.getID()).toBeTruthy();
        expect(createdPerson2.getID()).toBeTruthy();
        assertCreation.call(this, done);
      }.bind(this)
    );
  });
});
*/
