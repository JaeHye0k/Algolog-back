import express from "express";
import cors from "cors";

function start(router) {
    const app = express();
    const port = 8000;

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });

    app.use(express.json());
    app.use(cors());
    app.use(router);
}

const server = { start };

export default server;
