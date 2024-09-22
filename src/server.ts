import express, { Router } from "express";
import cors from "cors";

function start(postRouter: Router) {
    const app = express();
    const port = +(process.env.SERVER_PORT || 0);

    app.listen(port, () => {
        console.log(`Server running at http://${process.env.SERVER_IP}:${port}/`);
    });

    app.use(express.json());
    app.use(cors());
    app.get("/", (req, res) => {
        res.send("루트 입니다.");
    });
    app.use("/posts", postRouter);
}

const server = { start };

export default server;
