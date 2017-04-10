import { Component, OnInit } from '@angular/core';
import {EdRessourceFactory, EdUnknownObjectResource} from "../../../../../services/dao/ressource/ressource.impl";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

const personProvider = {
  provide: EdUnknownObjectResource,
  useFactory: () => {
    return EdRessourceFactory.getInstance().getResource("Person", null);
  }
};

@Component({
  selector: 'ed-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
  providers: [
    personProvider
  ]
})
export class PersonEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, public person: EdUnknownObjectResource) {

    person.getResource("PerBestFriend").getProperty("PerName");


    this.route.params.subscribe(function (params) {
      console.log(params);
      this.person.read(params["id"]).subscribe(function (resource) {
        Observable.merge(
          resource.getResource("PerBestFriend").read(),
          resource.getCollectionResource("PerOthersFriends").read()
        ).subscribe();
      });
    }.bind(this));
  }

  save() {
    console.log("save");
    this.person.getStore().saveResources([
      this.person.getResource("PerBestFriend"),
      this.person.getCollectionResource("PerOthersFriends"),
      this.person
    ]).subscribe(v => console.log(v), v => console.log(v), () => console.log("complete"));
  }

  ngOnInit() {

  }
}
