import logger from "../../core/Logger";
import { MenuRepository } from "../../repository/menu/MenuRepository";
import { executeTransaction } from '../../core/utility/Transaction';

export class MenuService {

    static menuRepo;

    constructor() {
        this.menuRepo = new MenuRepository();
    }

    async findMenuByPartnerId(partnerId) {
        logger.info('Start executing service => findMenuByPartnerId');
        return await this.menuRepo.findMenuByPartnerId(partnerId)
    }

    async findMenuItemById(itemId) {
        logger.info('Start executing service => findMenuItemById');
        return await this.menuRepo.findMenuItem(itemId)
    }

    async findMenuItemSides(categoryId) {
        logger.info('Start executing service => findMenuItemSides');
        return await this.menuRepo.findMenuItemSides(categoryId)
    }

    async saveMenu(menu) {
        logger.info('Start executing service => saveMenu');
        return await this.menuRepo.saveMenu(menu);
    }

    async deleteMenu(menu) {
        logger.info('Start executing service => deleteMenu');
        const transaction = await executeTransaction();
        try {
            await this.menuRepo.deleteMultipleMenuItem({ category_id: menu.category }, transaction);
            await this.menuRepo.deleteCategory({ menu_id: menu.id }, transaction);
            await this.menuRepo.deleteMenu({ id: menu.id }, transaction);
            transaction.commit();
            return true;
        }
        catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async saveCategory(category) {
        logger.info('Start executing service => saveCategory');
        return await this.menuRepo.saveCategory(category);
    }

    async deleteCategory(category) {
        logger.info('Start executing service => deleteCategory');
        const transaction = await executeTransaction();
        try {
            await this.menuRepo.deleteMenuItem({ category_id: category.id }, transaction);
            await this.menuRepo.deleteCategory({ id: category.id }, transaction);
            transaction.commit();
            return true;
        }
        catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async saveMenuItem(item) {
        logger.info('Start executing service => saveMenuItem');
        return await this.menuRepo.saveMenuItem(item);
    }

    async deleteMenuItem(item) {
        logger.info('Start executing service => deleteMenuItem');
        const transaction = await executeTransaction();
        try {
            await this.menuRepo.deleteMenuItem({ id: item.id }, transaction);
            transaction.commit();
            return true;
        }
        catch (error) {
            logger.error(`Error in MenuService==> ${error}`);
            transaction.rollback();
            throw error;
        }
    }
    async activateMenuItem(item) {
        logger.info('Start executing service => activateMenuItem');
        return await this.menuRepo.updateMenuItem(item);
    }

    async saveMenuVariation(variation) {
        logger.info('Start executing service => saveMenuVariation');
        return await this.menuRepo.saveItemVariation(variation);
    }

    async deleteMenuVariation(variation) {
        logger.info('Start executing service => deleteMenuVariation');
        return await this.menuRepo.deleteItemVariation(variation);
    }

    async saveSide(side) {
        logger.info('Start executing service => saveSides');
        return await this.menuRepo.saveSide(side);
    }

    async deleteSide(side) {
        logger.info('Start executing service => deleteSides');
        const transaction = await executeTransaction();
        try {
            await this.menuRepo.deleteSide(side, transaction);
            transaction.commit();
            return true;
        }
        catch (error) {
            logger.error(`Error in MenuService==> ${error}`);
            transaction.rollback();
            throw error;
        }
    }

    async saveSideItem(sideItem) {
        logger.info('Start executing service => saveSideItem');
        return await this.menuRepo.saveSideItem(sideItem);
    }

    async deleteSideItem(sideItem) {
        logger.info('Start executing service => deleteSideItem');
        return await this.menuRepo.deleteSideItem(sideItem);
    }

    async getMenuSides({ partnerId }) {
        logger.info('Start executing service => getMenuSides');
        return await this.menuRepo.getMenuSides(partnerId);
    }
}

