export function useBinderFor(vm: any): any;
export default Binder;
declare function Binder({ vm, children }: {
    vm: any;
    children: any;
}): JSX.Element;
declare namespace Binder {
    export function useBinder(): any;
    export { BinderContext as Context };
    export namespace propTypes {
        const vm: any;
    }
}
declare const BinderContext: any;
//# sourceMappingURL=Binder.d.ts.map