import DataType from 'sequelize';
import { MenuCategory } from './MenuCategoriesModel';
import dbConnection from '../../core/DbConnection';

export const Menus = dbConnection.connect().define('menus', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    partnerId: {
        type: DataType.INTEGER,
        field: "partner_id",
        references: {
            model: 'Partner',
            key: 'id'
        },
        allowNull: false
    },
    partnerName: {
        type: DataType.STRING,
        field: "partner_name",
        allowNull: false
    },
    menuName: {
        type: DataType.STRING,
        field: "menu_name",
        allowNull: false
    },
    isActive: {
        type: DataType.BOOLEAN,
        field: "is_active"
    }
}, {
    timestamps: false
});

Menus.hasMany(MenuCategory, { as: 'menuCategories', foreignKey: 'menu_id' });
