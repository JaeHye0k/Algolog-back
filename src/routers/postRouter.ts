import express from "express";
import Format from "../utills/Format.js";
import Validator from "../utills/Validator.js";
import mariadb from "../database/connect/mariadb.js";
import { RowDataPacket } from "mysql2";

const postRouter = express.Router();
const requiredCols: string[] = [];

mariadb.query(`SHOW COLUMNS FROM posts`, (err, data) => {
    data.forEach((row: RowDataPacket) => {
        if (row.Null === "YES") return;
        if (row.Type === "timestamp" || row.Extra === "auto_increment") return;
        requiredCols.push(row.Field);
    });
});
// TODO: 필수 항목이 다 채워지지 않은 상태에서 제출 시 예외 처리
// [ ] 홈페이지로 리다이렉트 안되게 하기
// [ ] 사용자가 입력한 content 그대로 유지 되게 하기
// [ ] 필수 항목 채워달라고 팝업창 띄우기
// TODO: 리펙토링
// [x] VALUES(?, ?) 형식으로 변경하기
// TODO: 인라인 코드블록은 다시 불러왔을 때 스타일 적용 안되는 이유 찾기
postRouter.post("/", (req, res) => {
    const cols = Object.keys(req.body);
    const values: string[] = Object.values(req.body);
    const isValid = Validator.checkBody(requiredCols, cols, values); // req.body 필드 유효성 검사
    const record = Format.record(cols, values);

    if (isValid) {
        mariadb.query(
            `INSERT INTO posts (??) VALUES (?)`,
            [record.cols, record.values],
            (err, data) => {
                if (err) console.error(err);
                else console.log(data);
                res.json({
                    ...req.body,
                    message: "성공적으로 등록되었습니다.",
                });
            },
        );
    } else {
        res.status(400).send("필수 항목을 모두 채워주세요");
    }
});

postRouter.get("/", (req, res) => {
    mariadb.query("SELECT * FROM posts", (err, data) => {
        res.json(data);
    });
});

postRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    mariadb.query(`SELECT content FROM posts WHERE id=?`, [id], (err, data) => {
        res.set("Content-Type", "text/html");
        // res.json(`<span onmouseover="alert('Hello?');">Hello?</span>`);
        res.json(data[0].content);
    });
});
export default postRouter;
