"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_impl_1 = require("../store/store.impl");
var EdRessourceFactory = (function () {
    function EdRessourceFactory() {
        this.store = new store_impl_1.EdFakeStore();
    }
    EdRessourceFactory.getInstance = function () {
        return this.instance;
    };
    EdRessourceFactory.prototype.getResource = function (type, id) {
        return this.store.readResource(type, id);
    };
    return EdRessourceFactory;
}());
EdRessourceFactory.instance = new EdRessourceFactory();
exports.EdRessourceFactory = EdRessourceFactory;
var EdUnknownResource = (function () {
    function EdUnknownResource(type, id, store) {
        this.type = type;
        this.id = id;
        this.store = store;
        this.attributes = {};
    }
    EdUnknownResource.prototype.read = function () {
        return this.store.readResource(this.type, this.getID());
    };
    EdUnknownResource.prototype.write = function () {
        throw new Error('Method not implemented.');
    };
    EdUnknownResource.prototype.getProperty = function (field) {
        if (this.attributes.hasOwnProperty(field)) {
        }
        else {
            throw new Error;
        }
    };
    EdUnknownResource.prototype.getResource = function (field) {
        throw new Error('Method not implemented.');
    };
    EdUnknownResource.prototype.setProperty = function (field, value) {
        throw new Error('Method not implemented.');
    };
    EdUnknownResource.prototype.getID = function () {
        return this.id;
    };
    return EdUnknownResource;
}());
exports.EdUnknownResource = EdUnknownResource;
var EdCollection = (function () {
    function EdCollection() {
    }
    return EdCollection;
}());
exports.EdCollection = EdCollection;
