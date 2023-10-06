require('dotenv').config(); //Load .env file into process.enc
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import followController from "./6-controllers/follow-controller";
import vacationController from "./6-controllers/vacations-controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", authController);
server.use("/api", vacationController);
server.use("/api", followController);

server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

