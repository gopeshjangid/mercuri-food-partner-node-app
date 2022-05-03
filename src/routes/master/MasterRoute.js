import express from "express";
import MasterController from "../../controllers/master/MasterController";

export class MasterRoutes {
    static configureRoutes() {
        const controller = new MasterController();
        const router = express.Router();
        router.get("/orderTypes", controller.getOrderTypes);
        router.get("/posTypes", controller.getPOSSystemTypes);
        router.get("/partnerTypes", controller.getPartnerTypes);
        return router;
    }
}
