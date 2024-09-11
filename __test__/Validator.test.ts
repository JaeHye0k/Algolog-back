import { ValidatorExtend } from "../src/utills/Validator";

test("req.body에 필요한 key가 전부 있을경우 true 아닐경우 false를 반환한다.", () => {
    // given
    const bodyExtendedSpy = jest.spyOn(ValidatorExtend, "checkColumnsExtended");
    const requiredKeys = ["category_id", "content", "title"];
    const validKeys = ["category_id", "content", "title"];
    const invalidKeys = ["category_id", "content", "name"];

    // when
    const isValidKeys = ValidatorExtend.checkColumnsExtended(requiredKeys, validKeys);
    const isInvalidKeys = ValidatorExtend.checkColumnsExtended(requiredKeys, invalidKeys);

    // then
    expect(isValidKeys).toBe(true);
    expect(isInvalidKeys).toBe(false);
    expect(bodyExtendedSpy).toHaveBeenCalledTimes(2);
});
