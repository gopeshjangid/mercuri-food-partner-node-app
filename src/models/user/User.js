
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';
import { Partner } from '../partner/Partner';

export const User = dbConnection.connect().define('users', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email is Incorrect!"
            }
        }
    },
    firstName: {
        type: DataType.STRING,
        field: "first_name"
    },
    lastName: {
        type: DataType.STRING,
        field: "last_name"
    },
    password: {
        type: DataType.STRING,
        allowNull: false,
    },
    partnerName: {
        type: DataType.STRING,
        allowNull: false,
        field: "partner_name"
    }
}, {
    timestamps: false
});

User.hasOne(Partner, { as: 'partner', foreignKey: 'user_id' });