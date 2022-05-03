import express from "express";
import OrderController from "../../controllers/order/OrderController";
import { authorizationApp } from "../../core/middleware/AppAuthorization";

export class OrderRoutes {
    static configureRoutes() {
        const controller = new OrderController();
        const router = express.Router();
        router.post("/paymentMethods", authorizationApp(), controller.paymentMethods);
        router.post("/makePayment", authorizationApp(), controller.makePayment);
        router.post("/allOrders", controller.allOrders);
        router.get("/orderDetail/:orderid", controller.orderDetail)
        router.get("/closeOrder/:orderid", controller.closeOrder)
        return router;
    }
}
