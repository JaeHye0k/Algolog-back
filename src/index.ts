import server from "./server.js";
import postRouter from "./routers/postRouter";

server.start(postRouter);
