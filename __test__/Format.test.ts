import { FormatExtend } from "../src/utills/Format";

test("cols와 values가 데이터베이스 삽입 형식에 맞게 객체로 반환된다.", () => {
    // given
    const recordSpy = jest.spyOn(FormatExtend, "recordExtended");
    const cols = ["category_id", "content", "title"];
    const values = ["카테고리", "내용", "제목"];

    // when
    const row = FormatExtend.recordExtended(cols, values);

    // then
    expect(row).toEqual({
        cols: ["category_id", "content", "title"],
        values: ["'카테고리'", "'내용'", "'제목'"],
    });
    expect(recordSpy).toHaveBeenCalledTimes(1);
});
