export default class Format {
    static record(cols: string[], values: (number | string)[]) {
        values = values.map((value, i) => {
            switch (typeof value) {
                case "number":
                    return value;
                case "string":
                    return value;
                default:
                    throw Error("타입 포멧팅 실패");
            }
        });
        return { cols, values };
    }
}

export class FormatExtend extends Format {
    static recordExtended(cols: string[], values: (number | string)[]) {
        return super.record(cols, values);
    }
}
