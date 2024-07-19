"use strict";
exports.__esModule = true;
var Properties_1 = require("../../properties/classes/Properties");
var ObjectVariableResolver = /** @class */ (function () {
    function ObjectVariableResolver(context) {
        this.context = context;
    }
    ObjectVariableResolver.prototype.resolveVariable = function (variableName) {
        return Properties_1["default"].getPropertyValue(this.context, variableName);
    };
    return ObjectVariableResolver;
}());
exports["default"] = ObjectVariableResolver;
//# sourceMappingURL=ObjectVariableResolver.js.map