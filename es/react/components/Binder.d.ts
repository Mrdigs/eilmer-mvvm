import React from "react";
import PropTypes from "prop-types";
import ReactBinder from "../classes/ReactBinder";
declare function Binder({ vm, children }: {
    vm: any;
    children: any;
}): React.JSX.Element;
declare namespace Binder {
    var useBinder: () => any;
    var Context: React.Context<any>;
    var propTypes: {
        vm: PropTypes.Validator<object>;
    };
}
export declare function useBinderFor(vm: any): ReactBinder<any>;
export default Binder;
//# sourceMappingURL=Binder.d.ts.map