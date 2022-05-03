import DataType from 'sequelize';
import dbConnection from '../../../core/DbConnection';

export const SideItems = dbConnection.connect().define('side_items', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sideCategoryId: {
        type: DataType.INTEGER,
        field: "side_category_id",
        references: {
            model: 'SideCategory',
            key: 'id'
        },
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    itemImage: {
        type: DataType.STRING,
        field: "item_image"
    },
    price: {
        type: DataType.INTEGER,
        allowNull: false
    },
    calories: {
        type: DataType.STRING
    },
    isDefault: {
        type: DataType.BOOLEAN,
        field: "is_default",
        allowNull: false
    },
    enableCustomization: {
        type: DataType.BOOLEAN,
        field: "enable_customization",
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
});
