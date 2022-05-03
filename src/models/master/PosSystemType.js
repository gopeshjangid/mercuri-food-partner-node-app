
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const PosSystemType = dbConnection.connect().define('pos_system_type', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: DataType.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});
