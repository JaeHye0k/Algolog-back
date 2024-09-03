import server from "./server.js";
import mariadb from "./database/connect/mariadb.js";
import router from "./router.js";

mariadb.connect();

server.start(router);
