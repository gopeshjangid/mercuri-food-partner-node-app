
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const PartnerType = dbConnection.connect().define('partner_type', {
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
