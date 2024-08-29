"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binding_1 = __importDefault(require("./Binding"));
var Binder = /** @class */ (function () {
    function Binder(viewModel) {
        this.viewModel = viewModel;
    }
    /*
    getViewModel(): VM {
      return this.viewModel
    }
    */
    /**
     *
     * @return {Binding}
     */
    Binder.prototype.bindProperty = function (propertyName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        return new Binding_1.default(this.viewModel, propertyName, converter, subscriber);
    };
    return Binder;
}());
exports.default = Binder;
//# sourceMappingURL=Binder.js.map