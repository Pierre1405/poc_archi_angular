import {Observable} from "rxjs/Observable";
import {EdIStore} from "../store.interface";
import {EdICollectionRessource, EdIObjectResource, EdIRessource} from "../../ressource/ressource.interface";
import {EdUnknownCollectionResource, EdUnknownObjectResource, EDUnknowPrimitiveRessource} from "../../ressource/ressource.impl";

export class EdFakeStore implements EdIStore {

  readResource(resource: EdIObjectResource): Observable<EdIObjectResource> {
    const resource$: Observable<EdIObjectResource> = Observable.create(function (observable) {
      window.setTimeout(function () {
        this.fillPerson(resource, this);
        observable.next(resource);
        observable.complete(resource);
      }.bind(this), 1);
    }.bind(this));
    return resource$;
  }


  readCollection(collection: EdICollectionRessource, filter: any, order: any, pagination: any): Observable<EdICollectionRessource> {
    const that = this;
    const collection$: Observable<EdICollectionRessource> = Observable.create(function (observable) {
      window.setTimeout(function () {
        const resources: EdIObjectResource[] = [];
        collection.setResources(resources);
        for (let i = 0; i < 5; i++) {
          const resource = new EdUnknownObjectResource("888" + i, that, "Person");
          this.fillPerson(resource, that);
          resources.push(resource);
          observable.next(collection);
        }
        observable.complete(collection);
      }.bind(this), 1);
    }.bind(this));
    return collection$;
  }

  private fillPerson(resource: EdIObjectResource) {
    resource.createProperty("PerName", new EDUnknowPrimitiveRessource("CORBEL" + resource.getID(), null));
    resource.createProperty("PerFstName", new EDUnknowPrimitiveRessource("Pierre" + resource.getID(), null));
    resource.createProperty("PerTitle", new EDUnknowPrimitiveRessource("Miss", null));
    resource.createResource("PerBestFriend", new EdUnknownObjectResource("5678", this, "Person"));

    resource.createCollectionResource("PerOthersFriends", new EdUnknownCollectionResource(this, "Person", resource.getID()));
    resource.setIsRead(true);
  }

  saveResources(resources: (EdIObjectResource|EdICollectionRessource)[]): Observable<any> {
    throw new Error('Method not implemented.');
  }
}

