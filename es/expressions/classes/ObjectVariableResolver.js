"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Properties_1 = __importDefault(require("../../properties/classes/Properties"));
var ObjectVariableResolver = /** @class */ (function () {
    function ObjectVariableResolver(context) {
        this.context = context;
    }
    ObjectVariableResolver.prototype.resolveVariable = function (variableName) {
        return Properties_1.default.getPropertyValue(this.context, variableName);
    };
    return ObjectVariableResolver;
}());
exports.default = ObjectVariableResolver;
//# sourceMappingURL=ObjectVariableResolver.js.map