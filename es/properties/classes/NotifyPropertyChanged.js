"use strict";
exports.__esModule = true;
var Properties_1 = require("./Properties");
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
        Properties_1["default"].notifyPropertyChanged(this, propertyName);
    };
    return NotifyPropertyChanged;
}());
exports["default"] = NotifyPropertyChanged;
//# sourceMappingURL=NotifyPropertyChanged.js.map