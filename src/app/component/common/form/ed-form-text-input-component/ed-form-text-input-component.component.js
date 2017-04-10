"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EdFormTextInputComponent = (function () {
    function EdFormTextInputComponent() {
        this.name = 'default';
    }
    EdFormTextInputComponent.prototype.ngOnInit = function () {
        console.log(name);
    };
    return EdFormTextInputComponent;
}());
__decorate([
    core_1.Input()
], EdFormTextInputComponent.prototype, "name", void 0);
EdFormTextInputComponent = __decorate([
    core_1.Component({
        selector: 'ed-form-text-input',
        templateUrl: './ed-form-text-input-component.component.html',
        styleUrls: ['./ed-form-text-input-component.component.css']
    })
], EdFormTextInputComponent);
exports.EdFormTextInputComponent = EdFormTextInputComponent;
