import server from "./server.js";
import postingRouter from "./routers/postingRouter.js";

server.start(postingRouter);
