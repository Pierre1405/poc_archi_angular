import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EdCommonModule} from "../common/ed.common.module";
import {PersonEditComponent} from "./sales/person/person-edit/person-edit.component";
import {CompanyEditComponent} from "./sales/company/company-edit/company-edit.component";
import { PersonListComponent } from './sales/person/person-list/person-list.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    PersonEditComponent,
    CompanyEditComponent,
    PersonListComponent
  ],
  imports: [
    EdCommonModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    PersonEditComponent,
    CompanyEditComponent
  ]
})
export class EdBusinessModule { }
