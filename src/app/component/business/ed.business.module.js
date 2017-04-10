"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ed_common_module_1 = require("../common/ed.common.module");
var person_edit_component_1 = require("./sales/person/person-edit/person-edit.component");
var company_edit_component_1 = require("./sales/company/company-edit/company-edit.component");
var EdBusinessModule = (function () {
    function EdBusinessModule() {
    }
    return EdBusinessModule;
}());
EdBusinessModule = __decorate([
    core_1.NgModule({
        declarations: [
            person_edit_component_1.PersonEditComponent,
            company_edit_component_1.CompanyEditComponent
        ],
        imports: [
            ed_common_module_1.EdCommonModule
        ],
        exports: [
            person_edit_component_1.PersonEditComponent,
            company_edit_component_1.CompanyEditComponent
        ]
    })
], EdBusinessModule);
exports.EdBusinessModule = EdBusinessModule;
