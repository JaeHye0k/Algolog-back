import express from "express";
import Format from "../utills/Format.js";
import Validator from "../utills/Validator.js";
import mariadb from "../database/connect/mariadb.js";
import { RowDataPacket } from "mysql2";

const postingRouter = express.Router();
const requiredCols: string[] = [];

mariadb.query(`SHOW COLUMNS FROM posting`, (err, data) => {
    data.forEach((row: RowDataPacket) => {
        if (
            row.Null === "NO" &&
            row.Field !== "created_at" &&
            row.Field !== "updated_at" &&
            row.Field !== "id"
        ) {
            requiredCols.push(row.Field);
        }
    });
});

postingRouter.post("/", (req, res) => {
    const cols = Object.keys(req.body);
    const values: (number | string)[] = Object.values(req.body);
    const isFulfilledColumns = Validator.checkColumns(requiredCols, cols); // req.body 필드 유효성 검사
    const record = Format.record(cols, values);

    record.cols = record.cols.concat("created_at", "updated_at");
    record.values = record.values.concat("now()", "now()");

    if (isFulfilledColumns) {
        mariadb.query(
            `INSERT INTO posting (${record.cols.join(",")}) VALUES(${record.values.join(",")})`,
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

export default postingRouter;
