import { Component } from '@angular/core';
import {EdIndexedDBStore} from "./services/dao/store/sqlite/store.impl";
import {EdIObjectResource} from "./services/dao/ressource/ressource.interface";
import {EdUnknownObjectResource} from "./services/dao/ressource/ressource.impl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'app works!';
  constructor() {
    /*
    const edSqliteStore = new EdIndexedDBStore();
    const resource: EdIObjectResource = new EdUnknownObjectResource("1", edSqliteStore, "Person");
    resource.setProperty("PerName", "first");
    resource.setResource("PerBestFriend", "2");

    resource.getCollectionResource("PerOthersFriends").addResources(["1", "2"]);

    edSqliteStore.saveResources([resource]).subscribe(function() {
      console.log(arguments);
    }, function() {
      console.log(arguments);
    }, function() {
    });

    edSqliteStore.readResource(resource).subscribe(function(person) {
      console.log("person", person);
      person.getResource("PerBestFriend").read().subscribe(function (bestFriend) {
        console.log("bestFriend", bestFriend);
      });
      person.getCollectionResource("PerOthersFriends").read().subscribe(function (perOthersFriends) {
        console.log("PerOthersFriends", perOthersFriends);
      });
    }, function() {
      console.log(arguments);
    }, function() {
    });
    */
  }
}
