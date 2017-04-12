import {EdIndexedDBStore} from "./store.impl";
import {EdIObjectResource} from "../../ressource/ressource.interface";
import {EdUnknownObjectResource} from "../../ressource/ressource.impl";
import {Observable} from "rxjs/Observable";

describe('1st tests', () => {
  let resource1: EdIObjectResource;
  let resource2: EdIObjectResource;
  let loadResource1: EdIObjectResource;
  let loadResource2: EdIObjectResource;
  let loadResourceFromEvent1: EdIObjectResource;
  let loadResourceFromEvent2: EdIObjectResource;

  beforeEach(function(done) {
    const store = new EdIndexedDBStore("unitTest");

    resource1 = new EdUnknownObjectResource("123", store, "Person");
    resource1.setProperty("PerFstName", "Pierrot");
    resource1.setProperty("PerName", "Delaluna");
    resource1.setProperty("PerTitle", "El");

    resource2 = new EdUnknownObjectResource("456", store, "Person");
    resource2.setProperty("PerFstName", "Pierrot2");
    resource2.setProperty("PerName", "Delaluna2");
    resource2.setProperty("PerTitle", "El2");

    console.log("start save resource");
    store.saveResources([resource1, resource2]).subscribe(
      function(resource) {
        console.log(resource);
      },
      function (error) {
        console.log(error);
        done();
      },
      function () {
        console.log("start read resource");
        loadResource1 = new EdUnknownObjectResource("123", store, "Person");
        loadResource2 = new EdUnknownObjectResource("456", store, "Person");
        const loadResource1$ = store.readResource(loadResource1);
        const loadResource2$ = store.readResource(loadResource2);
        loadResource1$.subscribe(function(dispatchedResource) {
          loadResourceFromEvent1 = dispatchedResource;
        }.bind(this));
        loadResource2$.subscribe(function(dispatchedResource) {
            loadResourceFromEvent2 = dispatchedResource;
        }.bind(this));

        Observable.merge(loadResource1$, loadResource2$).subscribe(
          null,
          function (error) {
            console.log(error);
            done();
          },
          function () {
            done();
          }
        );
      }.bind(this)
    );
  });

  it('save and load indexeddb should work', function () {
    expect(loadResourceFromEvent1.getProperty("PerFstName").getValue()).toEqual("Pierrot");
    expect(loadResourceFromEvent1.getProperty("PerName").getValue()).toEqual("Delaluna");
    expect(loadResourceFromEvent1.getProperty("PerTitle").getValue()).toEqual("El");
    expect(loadResource1.getProperty("PerFstName").getValue()).toEqual("Pierrot");
    expect(loadResource1.getProperty("PerName").getValue()).toEqual("Delaluna");
    expect(loadResource1.getProperty("PerTitle").getValue()).toEqual("El");
  });
});
