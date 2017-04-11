import {EdIndexedDBStore} from "./store.impl";
import {EdIObjectResource} from "../../ressource/ressource.interface";
import {EdUnknownObjectResource} from "../../ressource/ressource.impl";

// TODO refactor to use spyOn
describe('1st tests', () => {
  it('true is true', () => expect(true).toBe(true));
  it('save and load indexeddb should work', function () {
    debugger;
    const store = new EdIndexedDBStore("unitTest");
    const resource1: EdIObjectResource = new EdUnknownObjectResource("123", store, "Person");
    resource1.setProperty("PerFstName", "Pierrot");
    resource1.setProperty("PerName", "Delaluna");
    resource1.setProperty("PerTitle", "El");

    const resource2: EdIObjectResource = new EdUnknownObjectResource("456", store, "Person");
    resource2.setProperty("PerFstName", "Pierrot2");
    resource2.setProperty("PerName", "Delaluna2");
    resource2.setProperty("PerTitle", "El2");

    console.log("start save resource");
    store.saveResources([resource1, resource2]).subscribe( function () {
        console.log("start read resource");
        const loadResource1: EdIObjectResource = new EdUnknownObjectResource("123", store, "Person");
        store.readResource(loadResource1).subscribe(function(dispatchedResource) {
          expect(dispatchedResource.getProperty("PerFstName")).toEqual("Pierrot");
          expect(dispatchedResource.getProperty("PerName")).toEqual("ezezze");
          expect(dispatchedResource.getProperty("PerTitle")).toEqual("El");
          expect(loadResource1.getProperty("PerFstName")).toEqual("Pierrot");
          expect(loadResource1.getProperty("PerName")).toEqual("Delaluna");
          expect(loadResource1.getProperty("PerTitle")).toEqual("El");
          console.log("Resource read", loadResource1);


        }.bind(this), function () {
          expect(false).toBeTruthy();
        }.bind(this));

    }.bind(this),
    function () {
      expect(false).toBeTruthy();
    }.bind(this));

    window.indexedDB.deleteDatabase("unitTest");
  });
});
