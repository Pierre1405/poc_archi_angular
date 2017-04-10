"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EdPageComponent = (function () {
    function EdPageComponent() {
    }
    return EdPageComponent;
}());
EdPageComponent = __decorate([
    core_1.Component({
        selector: 'ed-page',
        templateUrl: './page.component.html',
        styleUrls: ['./page.component.css']
    })
], EdPageComponent);
exports.EdPageComponent = EdPageComponent;
var EdPageTitleComponent = (function () {
    function EdPageTitleComponent() {
    }
    return EdPageTitleComponent;
}());
EdPageTitleComponent = __decorate([
    core_1.Component({
        selector: 'ed-page-title',
        templateUrl: 'pagetitle.component.html'
    })
], EdPageTitleComponent);
exports.EdPageTitleComponent = EdPageTitleComponent;
var EdPageContentComponent = (function () {
    function EdPageContentComponent() {
    }
    return EdPageContentComponent;
}());
EdPageContentComponent = __decorate([
    core_1.Component({
        selector: 'ed-page-content',
        template: '<ng-content></ng-content>'
    })
], EdPageContentComponent);
exports.EdPageContentComponent = EdPageContentComponent;
