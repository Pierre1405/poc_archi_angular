"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ressource_impl_1 = require("../../../../services/dao/ressource/ressource.impl");
var PersonEditComponent = (function () {
    function PersonEditComponent() {
        var resource$ = ressource_impl_1.EdRessourceFactory.getInstance().getResource("Person", "1234");
        resource$.subscribe(function (resource) { console.log("Ressource loaded",resource); });
    }
    PersonEditComponent.prototype.ngOnInit = function () {
    };
    return PersonEditComponent;
}());
PersonEditComponent = __decorate([
    core_1.Component({
        selector: 'ed-person-edit',
        templateUrl: './person-edit.component.html',
        styleUrls: ['./person-edit.component.css']
    })
], PersonEditComponent);
exports.PersonEditComponent = PersonEditComponent;
