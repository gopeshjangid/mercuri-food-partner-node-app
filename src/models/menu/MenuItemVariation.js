import DataType from 'sequelize';
import dbConnection from '../../core/DbConnection';

export const MenuItemVariation = dbConnection.connect().define('menu_item_variations', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemId: {
        type: DataType.INTEGER,
        field: "item_id",
        references: {
            model: 'MenuItem',
            key: 'id'
        },
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    price: {
        type: DataType.INTEGER,
        allowNull: false
    },
    calories: {
        type: DataType.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true,
});
