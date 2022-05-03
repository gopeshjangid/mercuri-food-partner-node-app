import { Op } from "sequelize";
import { executeTransaction } from '../../core/utility/Transaction';
import { PartnerOrderType } from "../../models/partner/PartnerOrderType";
import { PartnerSchedule } from "../../models/partner/PartnerSchedule";
import { Menus } from "../../models/menu/MenuModel";
import { Partner } from "../../models/partner/Partner";
import { OrderType } from "../../models/master/OrderType";
import { PartnerType } from "../../models/master/PartnerType";
import { PosSystemType } from "../../models/master/PosSystemType";
import { MenuCategory } from "../../models/menu/MenuCategoriesModel";
import { MenuItem } from "../../models/menu/MenuItemModel";
import { User } from "../../models/user/User";
import logger from "../../core/Logger";

export class PartnerRepository {

    async findPartnerByLocaiton({ postalCode = null, locality = null, address = null }) {
        //check if partner has active menus
        return await Partner.findAll({
            include: [
                {
                    model: Menus,
                    as: 'menus',
                    attributes: {
                        exclude: ["partnerId", "partnerName", "menuName", "partner_id"]
                    },
                    where: { is_Active: true }
                },
                {
                    model: PartnerSchedule,
                    attributes: { exclude: ["partnerId", "partner_id"] },
                    as: 'schedules'
                },
                {
                    model: PartnerType,
                    as: 'partnerTypes'
                },
                {
                    model: PartnerOrderType,
                    as: 'partnerOrderType',
                    include: [
                        {
                            model: OrderType,
                            as: 'type',
                            attributes: {
                                exclude: ["id"]
                            }
                        }
                    ],
                    attributes: {
                        exclude: ["id", "partnerId", "partner_id"]
                    }
                }
            ],
            where: {
                [Op.or]: [
                    { zip_code: postalCode },
                    {
                        address_1: {
                            [Op.or]: [
                                { [Op.like]: `%${locality}%` },
                                { [Op.like]: `%${address}%` }
                            ]
                        }
                    },
                    {
                        address_2: {
                            [Op.or]: [
                                { [Op.like]: `%${locality}%` },
                                { [Op.like]: `%${address}%` }
                            ]
                        }
                    }
                ]
            }
        });
    }

    async findPartnerById(userId) {
        return await User.findOne({
            include: [{
                model: Partner,
                as: 'partner',
                include: [{
                    model: PartnerSchedule,
                    attributes: { exclude: [] },
                    as: 'schedules'
                },
                {
                    model: PartnerType,
                    as: 'partnerTypes'
                },
                {
                    model: PosSystemType,
                    as: 'posSystemTypes'
                },
                {
                    model: PartnerOrderType,
                    as: 'partnerOrderType',
                    include: [
                        {
                            model: OrderType,
                            as: 'type',
                            attributes: {
                                exclude: ["partner_id"]
                            }
                        }
                    ],
                    attributes: {
                        exclude: ["id", "partnerId", "orderType"]
                    }
                }],
            }],
            where: { id: userId },
            attributes: {
                exclude: ["password"]
            }
        });
    }

    async savePartnerDetails(partner) {
        const transaction = await executeTransaction();
        try {
            if (partner && partner.id) {
                await this.updatePartners(partner, transaction);
            } else {
                const partnerResponse = await Partner.create(partner, { transaction: transaction });
                partner.partner_id = partnerResponse.id;
                await PartnerSchedule.create(partner, { transaction: transaction });
                let orderTypes = [];
                partner.orderType.map(item => {
                    orderTypes.push({ "orderType": item.id, "partner_id": partnerResponse.id, "group": item.group })
                });
                logger.info("orderTypes are", orderTypes);
                await PartnerOrderType.bulkCreate(orderTypes, { transaction: transaction });
            }
            transaction.commit();
            return true;
        }
        catch (error) {
            logger.error(`Error In: saveTask method in repository is ${error}`);
            transaction.rollback();
            throw error;
        }
    }

    async updatePartners(partner, transaction) {
        await Partner.update(partner, { where: { id: partner.id }, transaction: transaction });
        partner.partner_id = partner.id;
        await PartnerSchedule.update(partner, { where: { partner_id: partner.id }, transaction: transaction });
        await PartnerOrderType.destroy({ where: { partner_id: partner.id }, transaction: transaction });
        let orderTypes = [];
        partner.orderType.map(item => {
            orderTypes.push({ "orderType": item.id, "partner_id": partner.id, "group": item.group })
        });
        await PartnerOrderType.bulkCreate(orderTypes, { transaction: transaction });
        return true;
    }

    async findMenuDetailsById(partnerId) {
        return await Partner.findOne({
            include: [{
                model: PartnerSchedule,
                as: 'schedules'
            },
            {
                model: Menus,
                attributes: { exclude: ["partner_id"] },
                as: 'menus',
                include: [
                    {
                        model: MenuCategory,
                        as: 'menuCategories',
                        attributes: {
                            exclude: ["menu_id"]
                        },
                        include: [
                            {
                                model: MenuItem,
                                as: 'menuItems',
                                attributes: ["id", "name", ["item_image", "itemImage"], "price", ["item_calories", "itemCalories"]]
                            }
                        ]
                    }
                ],
            }
            ],
            attributes: ["id"],
            where: { id: partnerId }
        });

    }

}
