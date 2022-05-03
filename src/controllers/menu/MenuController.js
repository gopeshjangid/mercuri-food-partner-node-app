import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { MenuService } from "../../services/menu/MenuService";

export default class MenuController extends BaseController {

    async findMenuItemById(req, res, next) {
        try {
            logger.info("In Controller of findMenuItemById");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const { itemId } = req.query;
            const data = await menuService.findMenuItemById(itemId);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async findMenuItemSides(req, res, next) {
        try {
            logger.info("In Controller of findMenuItemById");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const { categoryId } = req.query;
            const data = await menuService.findMenuItemSides(categoryId);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async findMenuByPartnerId(req, res, next) {
        try {
            logger.info("In Controller of findMenuByPartnerId");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const { partnerId } = req.query;
            const data = await menuService.findMenuByPartnerId(partnerId);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveMenu(req, res, next) {
        try {
            logger.info("Started Exceution for saveMenu Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveMenu(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteMenu(req, res, next) {
        try {
            logger.info("Started Exceution for deleteMenu Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteMenu(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveCategory(req, res, next) {
        try {
            logger.info("Started Exceution for saveCategory Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveCategory(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            logger.info("Started Exceution for deleteCategory Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteCategory(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveMenuItem(req, res, next) {
        try {
            logger.info("Started Exceution for saveMenuItem Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveMenuItem(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }


    async deleteMenuItem(req, res, next) {
        try {
            logger.info("Started Exceution for deleteMenuItem Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteMenuItem(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async activateMenuItem(req, res, next) {
        try {
            logger.info("Started Exceution for activateMenuItem Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.activateMenuItem(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveMenuVariation(req, res, next) {
        try {
            logger.info("Started Exceution for saveMenuVariation Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveMenuVariation(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteMenuVariation(req, res, next) {
        try {
            logger.info("Started Exceution for deleteMenuVariation Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteMenuVariation(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveSide(req, res, next) {
        try {
            logger.info("Started Exceution for saveSide Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveSide(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteSide(req, res, next) {
        try {
            logger.info("Started Exceution for deleteSide Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteSide(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async saveSideItem(req, res, next) {
        try {
            logger.info("Started Exceution for saveSideItem Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.saveSideItem(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteSideItem(req, res, next) {
        try {
            logger.info("Started Exceution for deleteSideItem Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.deleteSideItem(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getMenuSides(req, res, next) {
        try {
            logger.info("Started Exceution for getMenuSides Controller");
            const responseObj = new ReponseMessage();
            const menuService = new MenuService();
            const data = await menuService.getMenuSides(req.query);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

}
