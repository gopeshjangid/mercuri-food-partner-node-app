
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const UserAuth = dbConnection.connect().define('user_sessions', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataType.STRING,
        required: true,
    },
    user_id: {
        type: DataType.STRING,
        required: true,
    },
    start_time: {
        type: DataType.STRING,
        required: true
    },
    end_time: {
        type: DataType.STRING,
        required: true
    },
    ip: {
        type: DataType.STRING,
        required: true,
    },
    user_agent: {
        type: DataType.STRING,
        required: true
    },
    isLoggedIn: {
        type: DataType.BOOLEAN
    }
}, {
    timestamps: false
});
