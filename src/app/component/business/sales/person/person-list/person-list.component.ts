import { Component, OnInit } from '@angular/core';
import {
  EdRessourceFactory,
  EdUnknownCollectionResource
} from "../../../../../services/dao/ressource/ressource.impl";


@Component({
  selector: 'ed-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [{
    provide: EdUnknownCollectionResource,
    useFactory: () => {
      return EdRessourceFactory.getInstance().getCollectionRessource("Person");
    }
  }]
})
export class PersonListComponent implements OnInit {

  constructor(public persons: EdUnknownCollectionResource) {
    console.log(persons);
    persons.read().subscribe(v => console.log(v));
  }

  ngOnInit() {

  }

}
