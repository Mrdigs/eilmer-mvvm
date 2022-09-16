export default class ViewModel {
    static from(object: any): {
        useProperty(propertyName: any, converter?: any): any;
        useBinding(propertyName: any, converter?: any): any;
        useCommand(commandName: any, converter?: any, ...args: any[]): any;
        useEvent(eventName: any, listener?: any): any;
        dispatchCommand(commandName: any, ...args: any[]): any;
        registerActionHandler(): void;
    };
    useProperty(propertyName: any, converter?: any): void;
    useBinding(propertyName: any, converter?: any): void;
    useCommand(commandName: any, converter?: any, ...args: any[]): void;
    dispatchCommand(commandName: any, ...args: any[]): void;
    registerActionHandler(): void;
}
//# sourceMappingURL=ViewModel.d.ts.map