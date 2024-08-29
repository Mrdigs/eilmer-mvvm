"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBinder;
var react_1 = require("react");
var ReactBinder_1 = __importDefault(require("../classes/ReactBinder"));
function useBinder(viewModel) {
    return (0, react_1.useMemo)(function () {
        return new ReactBinder_1.default(viewModel);
    }, [viewModel]);
}
//# sourceMappingURL=useBinder.js.map