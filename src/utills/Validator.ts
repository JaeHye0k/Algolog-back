export default class Validator {
    static body(requiredKeys: string[], keys: string[]) {
        return requiredKeys.every((f) => keys.includes(f));
    }
}
