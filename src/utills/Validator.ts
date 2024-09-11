export default class Validator {
    static checkColumns(requiredCols: string[], cols: string[]) {
        return requiredCols.every((col) => cols.includes(col));
    }
}

export class ValidatorExtend extends Validator {
    static checkColumnsExtended(requiredCols: string[], cols: string[]) {
        return super.checkColumns(requiredCols, cols);
    }
}
