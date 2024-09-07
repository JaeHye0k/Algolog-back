export default class Format {
    static #date(date: Date) {
        return date.toLocaleDateString().replaceAll(". ", "-").slice(0, -1);
    }

    static #isDate(obj: any) {
        return obj instanceof Date && !isNaN(obj as any);
    }

    static record(cols: string[], values: any[]) {
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
