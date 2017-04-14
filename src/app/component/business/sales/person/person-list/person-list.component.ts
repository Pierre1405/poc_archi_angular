import { Component, OnInit } from '@angular/core';
import {
  EdDaoRessourceFactory,
  EdDaoUnknownCollectionResource
} from "../../../../../services/dao/ressource/ressource.impl";


@Component({
  selector: 'ed-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [{
    provide: EdDaoUnknownCollectionResource,
    useFactory: () => {
      return EdDaoRessourceFactory.getInstance().getCollectionRessource("Person");
    }
  }]
})
export class PersonListComponent implements OnInit {

  constructor(public persons: EdDaoUnknownCollectionResource) {
    console.log(persons);
    persons.read().subscribe(v => console.log(v));
  }

  ngOnInit() {

  }

}
