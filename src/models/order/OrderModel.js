
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const Order = dbConnection.connect().define('orders', {

    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataType.STRING,
        field: "order_number"
    },
    orderStatus: {
        type: DataType.INTEGER,
        field: "order_status",
        defaultValue: 1
    },
    partnerId: {
        type: DataType.INTEGER,
        required: true,
        field: "partner_id",
        references: {
            model: 'Partner',
            key: 'id'
        }
    },
    orderType: {
        type: DataType.STRING,
        field: "order_type"
    },
    tableNumber: {
        type: DataType.INTEGER,
        field: "table_number"
    },
    subtotal: {
        type: DataType.INTEGER,
        field: "subtotal"
    },
    total: {
        type: DataType.INTEGER,
        field: "total"
    },
    tax: {
        type: DataType.INTEGER,
        field: "tax"
    },
    cardLastFour: {
        type: DataType.STRING,
        field: "card_last_four"
    },
    firstName: {
        type: DataType.STRING,
        field: "first_name"
    },
    lastName: {
        type: DataType.STRING,
        field: "last_name"
    },
    email: {
        type: DataType.STRING,
        field: "email"
    },
    phoneNumber: {
        type: DataType.STRING,
        field: "phone_number"
    },
    deviceType: {
        type: DataType.STRING,
        field: "device_type"
    },
    deviceOs: {
        type: DataType.STRING,
        field: "device_os"
    },
    createdAt: {
        type: DataType.DATE,
        field: "created_at"
    },
    updatedAt: {
        type: DataType.DATE,
        field: "updated_at"
    },
    paymentStatus: {
        type: DataType.STRING,
        defaultValue: "Pending",
        field: "payment_status"
    },
    paymentReference: {
        type: DataType.STRING,
        field: "payment_reference"
    },
    paymentMethod: {
        type: DataType.STRING,
        field: "payment_method"
    },
    cardHolderName: {
        type: DataType.STRING,
        field: "card_holder_name"
    }
}, {
    timestamps: false
});
