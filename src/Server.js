import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./App";
import config from "./config/Index";
import dbConnection from "./core/DbConnection";
import logger from "./core/Logger";

const PORT = process.env.PORT || config.port;
const HOST = process.env.HOST || config.host;

const application = new app().init();
const server = http.createServer(application);


const listen = () => {
  server.listen(PORT,
    () => {
      logger.info(`${config.apiName} is running in IP: ${HOST}  PORT : ${PORT}`);
      logger.info(`Worker ${process.pid} started`);
    });
};


const stopServer = () => {
  logger.info("####### MongoDb Disconnected #######");
  server.close(() => {
    logger.warn(`${config.apiName}is Stopped in IP: ${HOST}  PORT : ${PORT}`);
  });
  //});
};

const startServer = () => {
  logger.info("Starting Db Server");
  /*** If Db connection SuccessFul then Start the Server Else Shutdown*/
  dbConnection.connect().sync({ force: true }).then(() => {
    // customerDbConnection.connect().sync().then(() => {
    //logger.info(`####### MYSQL DB Connected  #######`);
    listen();
    //}).catch((err) => {
    //logger.info(err.message);
    //});
  }).catch((err) => {
    logger.info(err.message);
  });

};

export {
  startServer,
  stopServer
};
