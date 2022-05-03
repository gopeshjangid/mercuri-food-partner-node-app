import { Sequelize } from 'sequelize';
import config from "../config/Index";

const dbConnection = (() => {

  const connect = () => {
    return new Sequelize(config.dbDetails.DB_NAME, config.dbDetails.USER, config.dbDetails.PASSWORD, {
      host: config.dbDetails.HOST,
      dialect: config.dbDetails.dialect
    });
  };

  const disConnect = () => {
    const db = new Sequelize();
    return db.close();
  };


  return {
    connect,
    disConnect
  };

})();

export default dbConnection;
