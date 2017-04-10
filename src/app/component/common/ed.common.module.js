"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var page_component_1 = require("./layout/page.component");
var ed_form_text_input_component_component_1 = require("./form/ed-form-text-input-component/ed-form-text-input-component.component");
var ed_column_container_component_1 = require("./layout/container/ed-column-container/ed-column-container.component");
var ed_container_item_component_1 = require("./layout/container/ed-container-item/ed-container-item.component");
var EdCommonModule = (function () {
    function EdCommonModule() {
    }
    return EdCommonModule;
}());
EdCommonModule = __decorate([
    core_1.NgModule({
        declarations: [
            page_component_1.EdPageTitleComponent,
            page_component_1.EdPageComponent,
            page_component_1.EdPageContentComponent,
            ed_form_text_input_component_component_1.EdFormTextInputComponent,
            ed_column_container_component_1.EdColumnContainerComponent,
            ed_container_item_component_1.EdContainerItemComponent
        ],
        imports: [
            platform_browser_1.BrowserModule
        ],
        exports: [
            page_component_1.EdPageTitleComponent,
            page_component_1.EdPageComponent,
            page_component_1.EdPageContentComponent,
            ed_form_text_input_component_component_1.EdFormTextInputComponent,
            ed_column_container_component_1.EdColumnContainerComponent,
            ed_container_item_component_1.EdContainerItemComponent
        ]
    })
], EdCommonModule);
exports.EdCommonModule = EdCommonModule;
