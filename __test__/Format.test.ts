import { FormatExtend } from "../src/utills/Format";

test("Date 객체가 전달되면 YYYY-MM-DD 형식으로 반환된다.", () => {
    // given
    const dateExtendedSpy = jest.spyOn(FormatExtend, "dateExtended");
    const dateStr = new Date(2000, 6, 4);

    // when
    const formattedDateStr = FormatExtend.dateExtended(dateStr);

    // then
    expect(formattedDateStr).toBe("2000-07-04");
    expect(dateExtendedSpy).toHaveBeenCalledTimes(1);
});

test("유효한 Date 객체가 전달되면 true 아니면 false가 반환된다.", () => {
    // given & when
    const isDateExtendedSpy = jest.spyOn(FormatExtend, "isDateExtended");
    const validDate = FormatExtend.isDateExtended(new Date());
    const inValidDate = FormatExtend.isDateExtended(new Date("2022-55-11"));
    const notDate = FormatExtend.isDateExtended({});

    // then
    expect(validDate).toBe(true);
    expect(inValidDate).toBe(false);
    expect(notDate).toBe(false);
    expect(isDateExtendedSpy).toHaveBeenCalledTimes(3);
});

test("cols와 values가 데이터베이스 삽입 형식에 맞게 객체로 반환된다.", () => {
    // given
    const recordSpy = jest.spyOn(FormatExtend, "recordExtended");
    const cols = ["category_id", "contents", "title"];
    const values = ["카테고리", "내용", "제목"];

    // when
    const row = FormatExtend.recordExtended(cols, values);

    // then
    expect(row).toEqual({
        cols: "category_id,contents,title",
        values: "'카테고리','내용','제목'",
    });
    expect(recordSpy).toHaveBeenCalledTimes(1);
});
