import express, { Router } from "express";
import cors from "cors";

function start(postRouter: Router) {
    const app = express();
    const port = +(process.env.SERVER_PORT || 0);
    const indexFolder = process.env.INDEX_FOLDER_PATH || "";

    app.listen(port, () => {
        console.log(`Server running at http://${process.env.SERVER_IP}:${port}/`);
    });

    app.use(express.json());
    app.use(cors());
    app.use(express.static(indexFolder));
    app.get("/", (req, res) => {
        res.sendFile(`${indexFolder}/index.html`);
    });
    app.use("/posts", postRouter);
}

const server = { start };

export default server;
