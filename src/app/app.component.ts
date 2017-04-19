import { Component } from '@angular/core';
import {EdDaoStore} from "./services/dao/store/store.impl";
import {EdDaoUnknownObjectResource} from "./services/dao/ressource/resource.impl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'app works!';
  constructor() {
  }
}
