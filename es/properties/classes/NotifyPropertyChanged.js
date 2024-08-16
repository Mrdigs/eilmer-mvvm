"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Properties_1 = __importDefault(require("./Properties"));
/**
 *
 *
 * @abstract
 */
var NotifyPropertyChanged = /** @class */ (function () {
    function NotifyPropertyChanged() {
    }
    /**
     * Notifies any listeners for a given property that it has changed.
     */
    NotifyPropertyChanged.prototype.notifyPropertyChanged = function (propertyName) {
        Properties_1.default.notifyPropertyChanged(this, propertyName);
    };
    return NotifyPropertyChanged;
}());
exports.default = NotifyPropertyChanged;
//# sourceMappingURL=NotifyPropertyChanged.js.map