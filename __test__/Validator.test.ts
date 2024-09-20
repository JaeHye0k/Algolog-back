import { ValidatorExtend } from "../src/utills/Validator";

describe("Validator 테스트", () => {
    const checkBodySpy = jest.spyOn(ValidatorExtend, "checkBody");
    const checkValuesSpy = jest.spyOn(ValidatorExtend, "checkValues");
    const checkKeysSpy = jest.spyOn(ValidatorExtend, "checkKeys");

    const requiredKeys = ["category_id", "content", "title"];
    const validKeys = ["category_id", "content", "title"];
    const invalidKeys = ["category_id", "content", "name"];

    const validValues = ["algorithm", "Today, I'm going to ...", "Min-Heap"];
    const invalidValues = [
        ["   ", "Today, I'm going to ...", "Min-Heap"],
        ["algorithm", "   ", "Min-Heap"],
        ["algorithm", "Today, I'm going to ...", "   "],
    ];

    const body = [
        [validKeys, validValues], // valid
        [validKeys, invalidValues[0]], // invalid
        [validKeys, invalidValues[1]], // invalid
        [validKeys, invalidValues[2]], // invalid
        [invalidKeys, validValues], // invalid
    ];

    test("request body 가 유효하면 true, 아니라면 false를 반환한다.", () => {
        // given & when
        body.forEach(([keys, values]) => {
            ValidatorExtend.checkBody(requiredKeys, keys, values);
        });
        // const validCount = 1;
        // const invalidCount = 4;

        // then
        const { results } = checkBodySpy.mock;

        expect(checkBodySpy).toHaveBeenCalledTimes(5);
        expect(results[0].value).toBe(true);
        expect(results[1].value).toBe(false);
        expect(results[2].value).toBe(false);
        expect(results[3].value).toBe(false);
        expect(results[4].value).toBe(false);

        // const valid: boolean[] = [];
        // const invalid: boolean[] = [];

        // results.forEach((result) => {
        //     const value: boolean = result.value;
        //     if (value) valid.push(value);
        //     else invalid.push(value);
        // });

        // expect(valid.length).toBe(validCount);
        // expect(invalid.length).toBe(invalidCount);
    });

    test("필수 key가 전부 있을경우 true, 아닐경우 false를 반환한다.", () => {
        // given & when
        const isValid = ValidatorExtend.checkKeys(requiredKeys, validKeys);
        const isInvalid = ValidatorExtend.checkKeys(requiredKeys, invalidKeys);

        // then
        expect(isValid).toBe(true);
        expect(isInvalid).toBe(false);
        expect(checkKeysSpy).toHaveBeenCalledTimes(2);
    });

    test("비어있는 key 가 없을 경우 true, 아닐경우 false를 반환한다.", () => {
        // given & when
        const isValid = ValidatorExtend.checkValues(validValues);
        const invalidCount = invalidValues.filter(
            (values) => !ValidatorExtend.checkValues(values),
        ).length;

        // then
        expect(isValid).toBe(true);
        expect(invalidCount).toBe(3);
        expect(checkValuesSpy).toHaveBeenCalledTimes(4);
    });
});
