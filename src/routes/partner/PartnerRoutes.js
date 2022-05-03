import express from "express";
import PartnerController from "../../controllers/partner/PartnerController";
import { authorizationApp } from "../../core/middleware/AppAuthorization";
import { authorization } from "../../core/middleware/Authorization";

export class PartnerRoutes {
    static configureRoutes() {
        const controller = new PartnerController();
        const router = express.Router();
        router.get("/details", authorizationApp(), controller.getPartnerDetails);
        router.get("/:id",authorization(), controller.getPartnerById);
        router.post("/save",authorization(), controller.savePartner);
        router.post("/uploadFile", authorization(),controller.uploadImages);
        router.post("/list", authorizationApp(), controller.getPartnerList);
        router.post("/sendReview",authorization(), controller.sendProfileReview);
        return router;
    }
}
