
import DataType from 'sequelize';
import dbConnection from '../../core/DbConnection';
import { MenuItemSides } from './MenuItemSides';
import { MenuItemVariation } from './MenuItemVariation';

export const MenuItem = dbConnection.connect().define('menu_items', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: {
        type: DataType.INTEGER,
        field: "category_id",
        references: {
            model: 'MenuCategory',
            key: 'id'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING
    },
    itemImage: {
        type: DataType.STRING,
        field: "item_image",
    },
    itemCalories: {
        type: DataType.STRING,
        field: "item_calories",
    },
    price: {
        type: DataType.DOUBLE,
        allowNull: false
    },
    applicableTaxes: {
        type: DataType.DOUBLE,
        field: "applicable_taxes",
    },
    enableSpecialInstructions: {
        type: DataType.BOOLEAN,
        field: "enable_special_instructions",
    },
    takeoutAvailable: {
        type: DataType.BOOLEAN,
        field: "takeout_available",
    },
    isActive: {
        type: DataType.BOOLEAN,
        field: "is_active"
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

MenuItem.hasMany(MenuItemSides, { as: 'menuItemSides', foreignKey: 'item_id' });
MenuItem.hasMany(MenuItemVariation, { as: 'menuItemVariations', foreignKey: 'item_id' });
