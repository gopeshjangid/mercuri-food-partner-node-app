import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import logger from "./core/Logger";
import { exceptionHandling } from "./core/middleware/ExceptionHandling";
import { resourceNotFound } from "./core/middleware/ResourcesNotFound";
import { RouteBinder } from "./routes/Index";
import config from "./config/Index";

export default class App {

    initRoutes(app) {
        app.use(config.apiBaseUri, RouteBinder.bindRoutes());
        logger.info("########## Routes initialized ###########");
    }

    initMiddleware(app) {
        app.use(exceptionHandling);
        app.use(resourceNotFound);
        logger.info("########## Middleware initialized ###########");
    }

    initSecurity(app) {
        app.use(cors(config.corsoptions));
        app.use(helmet());
        logger.info("########## Security initialized ###########");
    }

    initExternalModules(app) {
        app.use(morgan("dev"));
        app.use(cookieParser());
        logger.info("########## External Modules initialized ###########");
    }


    initGlobalVariable() {
        (global).isProduction = process.env.NODE_ENV; // @isProduction : global varible
        logger.info('########## Global Variables initialized ###########');
    }

    initFileUpload(app) {
        if (!fs.existsSync(config.filePath)) {
            fs.mkdirSync(config.filePath);
        }
        app.use(express.static(config.filePath));
        app.use(fileUpload({
            useTempFiles: false,
            tempFileDir: path.resolve(config.filePath)
        }));
    }

    init() {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        this.initExternalModules(app);
        this.initFileUpload(app);
        this.initSecurity(app);
        this.initGlobalVariable();
        this.initRoutes(app);
        this.initMiddleware(app);
        app.disable("x-powered-by");
        return app;
    }


}
