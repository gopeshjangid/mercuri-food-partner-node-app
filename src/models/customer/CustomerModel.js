
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const Customer = dbConnection.connect().define('customers', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataType.STRING,
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
    phone: {
        type: DataType.STRING,
        allowNull: false,
        field: "phone"
    }
}, {
    timestamps: false
});
