
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';

export const PartnerSchedule = dbConnection.connect().define('partner_schedule', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    partnerId: {
        type: DataType.INTEGER,
        field: "partner_id"
    },
    schedule: {
        type: DataType.JSON,
    }
}, {
    timestamps: false,
    freezeTableName: true
});