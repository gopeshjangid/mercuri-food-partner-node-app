
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';
import { OrderType } from '../master/OrderType';

export const PartnerOrderType = dbConnection.connect().define('partner_order_type', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    partnerId: {
        type: DataType.INTEGER,
        references: {
            model: 'Partner',
            key: 'id'
        },
        field: "partner_id"
    },
    orderType: {
        type: DataType.INTEGER,
        references: {
            model: 'OrderType',
            key: 'id'
        },
        field: "order_type_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});


PartnerOrderType.hasOne(OrderType, { as: 'type', foreignKey: 'id', sourceKey: 'orderType' });
