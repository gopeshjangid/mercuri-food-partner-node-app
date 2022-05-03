import { Sequelize } from 'sequelize';
import config from "../config/Index";

const customerDbConnection = (() => {

    const connect = () => {
        return new Sequelize(config.dbDetails.CUSTOMER_DB, config.dbDetails.USER, config.dbDetails.PASSWORD, {
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

export default customerDbConnection;
