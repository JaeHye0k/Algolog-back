export default class Validator {
    static body(requiredKeys, keys) {
        return requiredKeys.every((f) => keys.includes(f));
    }
}
