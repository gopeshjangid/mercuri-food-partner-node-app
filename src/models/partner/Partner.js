
import dbConnection from '../../core/DbConnection';
import DataType from 'sequelize';
import { PartnerSchedule } from './PartnerSchedule';
import { PartnerOrderType } from './PartnerOrderType';
import { PartnerType } from '../master/PartnerType';
import { PosSystemType } from '../master/PosSystemType';
import { Menus } from '../menu/MenuModel';
import { SideCategory  } from '../menu/sides/Sides';

export const Partner = dbConnection.connect().define('partners', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataType.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
        field: "user_id"
    },
    partnerName: {
        type: DataType.STRING,
        field: "partner_name"
    },
    simplifiedName: {
        type: DataType.STRING,
        field: "simplified_name"
    },
    description: {
        type: DataType.STRING
    },
    website: {
        type: DataType.STRING,
        validate: {
            isUrl: {
                msg: "Website Name is Incorrect!"
            }
        }
    },
    phone: {
        type: DataType.STRING
    },
    address1: {
        type: DataType.STRING,
        field: "address_1"
    },
    address2: {
        type: DataType.STRING,
        field: "address_2"
    },
    city: {
        type: DataType.STRING
    },
    state: {
        type: DataType.STRING
    },
    zipCode: {
        type: DataType.STRING,
        field: "zip_code"
    },
    profileImage: {
        type: DataType.STRING,
        field: "profile_image"
    },
    coverImage: {
        type: DataType.STRING,
        field: "cover_image"
    },
    brandColor: {
        type: DataType.STRING,
        field: "brand_color"
    },
    posSystemType: {
        type: DataType.INTEGER,
        references: {
            model: 'PosSystemType',
            key: 'id'
        },
        field: "pos_system_type"
    },
    partnerType: {
        type: DataType.INTEGER,
        references: {
            model: 'PartnerType',
            key: 'id'
        },
        field: "partner_type"
    },
    salesTax: {
        type: DataType.STRING,
        field: "sales_tax"
    },
    alcoholTax: {
        type: DataType.STRING,
        field: "alcohol_tax"
    },
    isTemporarilyClosed: {
        type: DataType.BOOLEAN,
        field: "is_temporary_closed"
    },
    enableOpenTab:{
        type: DataType.BOOLEAN,
        field: "enable_open_tab"
    },
    enableLoyalty:{
        type: DataType.BOOLEAN,
        field: "enable_loyalty"
    },
    isApproved: {
        type: DataType.BOOLEAN,
        field: "is_approved"
    },
    isActive: {
        type: DataType.BOOLEAN,
        field: "is_active"
    },
    merchantAccountId: {
        type: DataType.STRING,
        field: "merchant_account_id"
    },


}, {
    timestamps: false,
    freezeTableName: true
});

Partner.hasMany(Menus, { as: 'menus', foreignKey: 'partner_id' });
Partner.hasMany(PartnerOrderType, { as: 'partnerOrderType', foreignKey: 'partner_id' });
Partner.hasOne(PartnerSchedule, { as: 'schedules', foreignKey: 'partner_id' });
Partner.hasOne(PartnerType, { as: 'partnerTypes', foreignKey: 'id', sourceKey: 'partnerType' });
Partner.hasOne(PosSystemType, { as: 'posSystemTypes', foreignKey: 'id', sourceKey: 'posSystemType' });
Partner.hasMany(SideCategory , { as: 'sideCategory', foreignKey: 'partner_id' });
