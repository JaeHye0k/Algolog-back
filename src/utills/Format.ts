export default class Format {
    static date(date: Date) {
        const yyyymmdd = /(\d{4}). (\d{1,2}). (\d{1,2})./;
        const dateStr = date.toLocaleDateString();
        const formattedDateStr = dateStr.replace(yyyymmdd, (match, p1, p2, p3) => {
            const year = p1;
            const month = p2.padStart(2, "0");
            const day = p3.padStart(2, "0");
            return `${year}-${month}-${day}`;
        });
        return formattedDateStr;
    }

    protected static isDate(obj: Date | object) {
        return obj instanceof Date && !isNaN(Number(obj));
    }

    static record(cols: string[], values: (number | string | object)[]) {
        values = values.map((value, i) => {
            switch (typeof value) {
                case "number":
                    return value;
                case "string":
                    return `'${value}'`;
                case "object":
                    if (Format.isDate(value)) return `'${Format.date(value as Date)}'`;
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

export class FormatExtend extends Format {
    static dateExtended(date: Date) {
        return super.date(date);
    }
    static isDateExtended(obj: Date | object) {
        return super.isDate(obj);
    }
    static recordExtended(cols: string[], values: (number | string | object)[]) {
        return super.record(cols, values);
    }
}
