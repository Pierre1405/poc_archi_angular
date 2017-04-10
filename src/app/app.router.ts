import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {PersonEditComponent} from "./component/business/sales/person/person-edit/person-edit.component";
import {CompanyEditComponent} from "./component/business/sales/company/company-edit/company-edit.component";
import {PersonListComponent} from "./component/business/sales/person/person-list/person-list.component";

export const router: Routes = [
  { path: '', redirectTo: 'personEdit', pathMatch: 'full'},
  { path: 'personEdit', component: PersonEditComponent},
  { path: 'personEdit/:id', component: PersonEditComponent},
  { path: 'persons', component:PersonListComponent},
  { path: 'companyEdit', component: CompanyEditComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
