import DataType from 'sequelize';
import dbConnection from '../../../core/DbConnection';
import { SideItems } from './SideItems';

export const SideCategory = dbConnection.connect().define('side_categories', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
    },
    label: {
        type: DataType.STRING,
    },
    partnerId: {
        type: DataType.INTEGER,
        field: "partner_id",
        references: {
            model: 'Partner',
            key: 'id'
        },
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

SideCategory.hasMany(SideItems, { as: 'sideItems', foreignKey: 'side_category_id' });