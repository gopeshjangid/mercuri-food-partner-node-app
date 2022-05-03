import express from "express";
import { AuthRoutes } from "./auth/AuthRoutes";
import { MasterRoutes } from "./master/MasterRoute";
import { MenuRoutes } from "./menu/MenuRoute";
import { PartnerRoutes } from "./partner/PartnerRoutes";
import { OrderRoutes } from "./order/OrderRoute";
import { CustomerRoutes } from "./customer/CustomerRoutes";

export class RouteBinder {
    static bindRoutes() {
        const router = express.Router();
        // @** attach route guard i.e access restriction based on module level.
        router.use("/auth", AuthRoutes.configureRoutes());
        router.use("/partner", PartnerRoutes.configureRoutes());
        router.use("/master", MasterRoutes.configureRoutes());
        router.use("/menu", MenuRoutes.configureRoutes());
        router.use("/order", OrderRoutes.configureRoutes());
        router.use("/customer", CustomerRoutes.configureRoutes());
        return router;
    }
}
