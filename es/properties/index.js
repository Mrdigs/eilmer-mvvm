"use strict";
// *********************************
exports.__esModule = true;
exports.notifyPropertyChanged = exports.removePropertyChangeListener = exports.addPropertyChangeListener = exports.setPropertyValue = exports.getPropertyValue = exports.NotifyPropertyChanged = exports.Properties = void 0;
/*

  TODO: I think I want a PropertyChange class, and a PropertyChangeSupport
  (like in Java) class.

*/
var Properties_1 = require("./classes/Properties");
exports.Properties = Properties_1["default"];
var NotifyPropertyChanged_1 = require("./classes/NotifyPropertyChanged");
exports.NotifyPropertyChanged = NotifyPropertyChanged_1["default"];
var getPropertyValue = Properties_1["default"].getPropertyValue;
exports.getPropertyValue = getPropertyValue;
var setPropertyValue = Properties_1["default"].setPropertyValue;
exports.setPropertyValue = setPropertyValue;
var addPropertyChangeListener = Properties_1["default"].addPropertyChangeListener;
exports.addPropertyChangeListener = addPropertyChangeListener;
var removePropertyChangeListener = Properties_1["default"].removePropertyChangeListener;
exports.removePropertyChangeListener = removePropertyChangeListener;
var notifyPropertyChanged = Properties_1["default"].notifyPropertyChanged;
exports.notifyPropertyChanged = notifyPropertyChanged;
exports["default"] = {
    NotifyPropertyChanged: NotifyPropertyChanged_1["default"],
    getPropertyValue: getPropertyValue,
    setPropertyValue: setPropertyValue,
    addPropertyChangeListener: addPropertyChangeListener,
    removePropertyChangeListener: removePropertyChangeListener,
    notifyPropertyChanged: notifyPropertyChanged
};
//# sourceMappingURL=index.js.map