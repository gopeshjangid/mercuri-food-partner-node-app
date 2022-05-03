
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const CustomerAuth = dbConnection.connect().define('customer_sessions', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataType.STRING,
        required: true,
    },
    customerId: {
        type: DataType.STRING,
        required: true,
        field: "customer_id"
    },
    startTime: {
        type: DataType.STRING,
        required: true,
        field: "start_time"
    },
    endTime: {
        type: DataType.STRING,
        required: true,
        field: "end_time"
    },
    ip: {
        type: DataType.STRING,
        required: true,
    },
    customerAgent: {
        type: DataType.STRING,
        required: true,
        field: "customer_agent"
    },
    isLoggedIn: {
        type: DataType.BOOLEAN,
        default: true,
    }
}, {
    timestamps: false
});
