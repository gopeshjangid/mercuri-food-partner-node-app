
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';
import { SideItems } from '../menu/sides/SideItems';

export const OrderItemSides = dbConnection.connect().define('order_items_sides', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderItemId: {
        type: DataType.INTEGER,
        field: "order_item_id",
        references: {
            model: 'OrderItem',
            key: 'id'
        }
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false,
        field: "quantity"
    },
    sideItemId: {
        type: DataType.INTEGER,
        field: "side_item_id",
        references: {
            model: 'SideItem',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

OrderItemSides.hasOne(SideItems, { as: 'sideItem', foreignKey: 'id', sourceKey: 'sideItemId' });
