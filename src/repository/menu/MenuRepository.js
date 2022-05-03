import { MenuCategory } from "../../models/menu/MenuCategoriesModel";
import { MenuItem } from "../../models/menu/MenuItemModel";
import { Menus } from "../../models/menu/MenuModel";
import logger from "../../core/Logger";
import { MenuItemVariation } from "../../models/menu/MenuItemVariation";
import { SideCategory } from "../../models/menu/sides/Sides";
import { SideItems } from "../../models/menu/sides/SideItems";
import { MenuItemSides } from "../../models/menu/MenuItemSides";
export class MenuRepository {

    async findMenuByPartnerId(partnerId) {
        return await Menus.findAll({
            include: [
                {
                    model: MenuCategory,
                    as: 'menuCategories',
                    attributes: {
                        exclude: ["menuId", "menu_id"]
                    },
                    include: [
                        {
                            model: MenuItem,
                            as: 'menuItems'
                        }
                    ]
                }
            ],
            where: { "partner_id": partnerId },
            attributes: {
                exclude: ["partnerId", "partner_id"]
            },
        });
    }

    async findMenuItem(itemId) {
        return await MenuItem.findOne({
            include: [
                {
                    model: MenuItemSides,
                    as: 'menuItemSides',
                    attributes: {
                        exclude: ["itemId", "item_id"]
                    },
                    include: [{
                        model: SideCategory,
                        as: 'sideCategory',
                        attributes: {
                            exclude: ["partnerId", "partner_id"]
                        }
                    }]
                },
                {
                    model: MenuItemVariation,
                    as: 'menuItemVariations',
                    attributes: {
                        exclude: ["itemId", "item_id"]
                    },
                }
            ],
            where: { id: itemId },
            attributes: { exclude: ["category_id"] }
        });
    }

    async saveMenu(menu) {
        logger.info(`In saveMenu Repository method with body ${JSON.stringify(menu)}`);
        return (menu.id) ? Menus.update(menu, { where: { id: menu.id } }) : Menus.create(menu);
    }

    async deleteMenu(condition, transaction) {
        return Menus.destroy({ where: condition, transaction: transaction });
    }

    async saveCategory(category) {
        logger.info(`In saveCategory method of Menu Repository with body is ${JSON.stringify(category)}`);
        return (category.id) ? MenuCategory.update(category, { where: { id: category.id } }) : MenuCategory.create(category);
    }

    async deleteCategory(condition, transaction) {
        return MenuCategory.destroy({ where: condition, transaction: transaction });
    }

    async saveMenuItem(item) {
        logger.info(`Saving Menu Item with body ${JSON.stringify(item)}`);
        return (item.id) ? MenuItem.update(item, { where: { id: item.id } }) : MenuItem.create(item);
    }

    async deleteMenuItem(condition, transaction) {
        return MenuItem.destroy({ where: condition, transaction });
    }

    async deleteMultipleMenuItem(condition, transaction) {
        return MenuItem.destroy({ where: condition, transaction: transaction });
    }

    async updateMenuItem(item) {
        return await Menus.update({ isActive: item.isActive }, { where: { partnerid: item.partnerid, menuid: item.menu_id } });
    }

    async saveItemVariation(variation) {
        logger.info(`In Repo ==> Saving Menu Item Variation with body ${JSON.stringify(variation)}`);
        return (variation.id) ? MenuItemVariation.update(variation, { where: { id: variation.id } }) : MenuItemVariation.create(variation);
    }

    async deleteItemVariation(variation) {
        logger.info(`In Repo ==> Deleting Menu Item Variation with body ${JSON.stringify(variation)}`);
        return MenuItemVariation.destroy({ where: { id: variation.id } });
    }

    async saveSide(sides) {
        logger.info(`In Repo ==> Saving Menu Sides with body ${JSON.stringify(sides)}`);
        return (sides.id) ? SideCategory.update(sides, { where: { id: sides.id } }) : SideCategory.create(sides);
    }

    async deleteSide(sides, transaction) {
        logger.info(`In Repo ==> Deleting Menu Sides with body ${JSON.stringify(sides)}`);
        await SideItems.destroy({ where: { side_category_id: sides.id }, transaction: transaction });
        return SideCategory.destroy({ where: { id: sides.id }, transaction: transaction });
    }

    async saveSideItem(sideItem) {
        logger.info(`In Repo ==> Saving Menu Side Item with body ${JSON.stringify(sideItem)}`);
        return (sideItem.id) ? SideItems.update(sideItem, { where: { id: sideItem.id } }) : SideItems.create(sideItem);
    }

    async deleteSideItem(sideItem) {
        logger.info(`In Repo ==> Deleting Menu Side Item with body ${JSON.stringify(sideItem)}`);
        return SideItems.destroy({ where: { id: sideItem.id } });
    }

    async findMenuItemSides(sideCategoryId) {
        return await SideItems.findAll({
            where: { sideCategoryId },
            attributes: { exclude: ["sideCategoryId"] }
        });
    }

    async getMenuSides(partnerId) {
        return await SideCategory.findAll({
            include: [
                {
                    model: SideItems,
                    as: 'sideItems',
                }
            ],
            where: { "partner_id": partnerId },
            // attributes: {
            //     exclude: ["partnerId", "partner_id"]
            // },
        });
    }

}
