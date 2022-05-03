
import DataType from 'sequelize';
import { MenuItem } from './MenuItemModel';
import dbConnection from '../../core/DbConnection';

export const MenuCategory = dbConnection.connect().define('menu_categories', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    menuId: {
        type: DataType.INTEGER,
        field: "menu_id",
        references: {
            model: 'Menus',
            key: 'id'
        },
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
    },
    takeoutAvailable: {
        type: DataType.BOOLEAN,
        field: "takeout_available",
        allowNull: false
    },
    isActive: {
        type: DataType.BOOLEAN,
        field: "is_active"
    }
}, {
    timestamps: false
});

MenuCategory.hasMany(MenuItem, { as: 'menuItems', foreignKey: 'category_id' });
