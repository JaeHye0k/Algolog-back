import express from "express";
import Format from "../utills/Format.js";
import Validator from "../utills/Validator.js";
import mariadb from "../database/connect/mariadb.js";

const posts = express.Router();

posts.post("/", (req, res) => {
    const requiredKeys = ["category_id", "contents", "title"];
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const keyIsValid = Validator.body(requiredKeys, keys); // req.body 필드 유효성 검사
    const record = Format.record(keys, values);
    if (keyIsValid) {
        mariadb.query(
            `INSERT INTO posting (${record.cols}) VALUES(${record.values})`,
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

export default posts;
