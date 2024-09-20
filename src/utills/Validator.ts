export default class Validator {
    static checkBody(requiredCols: string[], cols: string[], values: string[]) {
        let isValid = true;
        if (!Validator.checkKeys(requiredCols, cols)) isValid = false;
        if (!Validator.checkValues(values)) isValid = false;
        return isValid;
    }
    protected static checkKeys(requiredCols: string[], cols: string[]) {
        return JSON.stringify(requiredCols) === JSON.stringify(cols);
    }
    protected static checkValues(values: string[]) {
        return values.every((val) => val.trim().length > 0);
    }
}

export class ValidatorExtend extends Validator {
    static checkBody(requiredCols: string[], cols: string[], values: string[]) {
        return super.checkBody(requiredCols, cols, values);
    }
    static checkKeys(requiredCols: string[], cols: string[]) {
        return super.checkKeys(requiredCols, cols);
    }
    static checkValues(values: string[]) {
        return super.checkValues(values);
    }
}
