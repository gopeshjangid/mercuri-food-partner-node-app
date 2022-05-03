
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const OrderType = dbConnection.connect().define('order_type', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: DataType.INTEGER
    },
    group: {
        type: DataType.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});
