import server from "./server.js";
import mariadb from "./database/connect/mariadb.js";
import postRouter from "./routers/postRouter.js";

mariadb.connect();

server.start(postRouter);
