
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';
import { MenuItem } from '../menu/MenuItemModel';

export const OrderItem = dbConnection.connect().define('order_items', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: "order_id",
        references: {
            model: 'Order',
            key: 'id'
        }
    },
    itemId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: "item_id",
        references: {
            model: 'MenuItem',
            key: 'id'
        }
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false,
        field: "quantity"
    }
}, {
    timestamps: false
});

OrderItem.hasOne(MenuItem, { as: 'menuItem', foreignKey: 'id', sourceKey: 'itemId' });
