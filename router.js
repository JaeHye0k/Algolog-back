import express from "express";
import postingHandler from "./handler/posting.handler.js";

const router = express.Router();

router.post("/api/insertBoardData", (req, res) => {
    postingHandler.create();
    res.send();
});

export default router;
