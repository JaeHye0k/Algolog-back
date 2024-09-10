export default class Validator {
    static body(requiredKeys: string[], keys: string[]) {
        return requiredKeys.every((key) => keys.includes(key));
    }
}

export class ValidatorExtend extends Validator {
    static bodyExtended(requiredKeys: string[], keys: string[]) {
        return super.body(requiredKeys, keys);
    }
}
