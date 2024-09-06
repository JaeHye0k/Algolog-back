export default class Format {
    static #date(date) {
        return date.toLocaleDateString().replaceAll(". ", "-").slice(0, -1);
    }

    static #isDate(obj) {
        return obj instanceof Date && !isNaN(obj);
    }

    static record(cols, values) {
        values = values.map((value, i) => {
            switch (typeof value) {
                case "number":
                    return value;
                case "string":
                    return `'${value}'`;
                case "object":
                    if (Format.#isDate(value)) return `'${Format.#date(value)}'`;
                default:
                    throw Error("타입 포멧팅 실패");
            }
        });
        return {
            cols: cols.join(","),
            values: values.join(","),
        };
    }
}
