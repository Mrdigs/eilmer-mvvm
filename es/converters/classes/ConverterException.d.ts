export default class ConverterException extends Error {
    handled: boolean;
    property: any;
    value: any;
    constructor(message: string, property?: string, value?: any);
    toString(): string;
}
//# sourceMappingURL=ConverterException.d.ts.map