import express from "express";
import MenuController from "../../controllers/menu/MenuController";
import { authorizationApp } from "../../core/middleware/AppAuthorization";
import { authorization } from "../../core/middleware/Authorization";

export class MenuRoutes {
    static configureRoutes() {
        const controller = new MenuController();
        const router = express.Router();
        router.get("/item", authorizationApp(), controller.findMenuItemById);
        router.get("/item/sides", authorizationApp(), controller.findMenuItemSides);
        router.get("/details", authorization(), controller.findMenuByPartnerId);
        router.post("/saveMenu", authorization(), controller.saveMenu);
        router.post("/deleteMenu", authorization(), controller.deleteMenu);
        router.post("/saveCategory", authorization(), controller.saveCategory);
        router.post("/deleteCategory", authorization(), controller.deleteCategory);
        router.post("/saveItem", authorization(), controller.saveMenuItem);
        router.post("/deleteItem", authorization(), controller.deleteMenuItem);
        router.post("/activateMenu", authorization(), controller.activateMenuItem);
        router.post("/saveVariation", authorization(), controller.saveMenuVariation);
        router.post("/deleteVariation", authorization(), controller.deleteMenuVariation);
        router.post("/saveSide", authorization(), controller.saveSide);
        router.post("/deleteSide", authorization(), controller.deleteSide);
        router.post("/saveSideItem", authorization(), controller.saveSideItem);
        router.post("/deleteSideItem", authorization(), controller.deleteSideItem);
        router.get("/sides", authorization(), controller.getMenuSides);
        return router;
    }
}
