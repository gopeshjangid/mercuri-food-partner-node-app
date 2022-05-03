import DataType from 'sequelize';
import dbConnection from '../../core/DbConnection';
import { SideCategory } from './sides/Sides';

export const MenuItemSides = dbConnection.connect().define('menu_item_sides', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemId: {
        type: DataType.INTEGER,
        field: "item_id",
        allowNull: false,
        references: {
            model: 'MenuItem',
            key: 'id'
        },
    },
    sideCategoryId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: "side_category_id",
        references: {
            model: 'SideCategory',
            key: 'id'
        },
    },
    label: {
        type: DataType.STRING,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

MenuItemSides.hasOne(SideCategory, { as: 'sideCategory', foreignKey: 'id', sourceKey: 'sideCategoryId' });
