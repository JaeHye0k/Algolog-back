import server from "./server.js";
import mariadb from "./database/connect/mariadb.js";
import postingRouter from "./routers/postingRouter.js";

mariadb.connect();

server.start(postingRouter);
