import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { OrderService } from "../../services/orders/OrderService";

export default class OrderController extends BaseController {

    async makePayment(req, res, next) {
        try {
            logger.info("Started Exceution for makePayment Controller");
            const responseObj = new ReponseMessage();
            const orderService = new OrderService();
            const data = await orderService.makePayment(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async paymentMethods(req, res, next) {
        try {
            logger.info("Started Exceution for paymentMethods Controller");
            const responseObj = new ReponseMessage();
            const orderService = new OrderService();
            const data = await orderService.paymentMethods(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async allOrders(req, res, next) {
        try {
            logger.info("Started Exceution for AllOrders Controller");
            const responseObj = new ReponseMessage();
            const orderService = new OrderService();
            const data = await orderService.allOrders(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async orderDetail(req, res, next) {
        try {
            logger.info("Started Exceution for orderDetail Controller");
            const responseObj = new ReponseMessage();
            const orderService = new OrderService();
            const data = await orderService.orderDetail(req.params.orderid);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async closeOrder(req, res, next) {
        try {
            logger.info("Started Exceution for closeOrder Controller");
            const responseObj = new ReponseMessage();
            const orderService = new OrderService();
            const data = await orderService.closeOrder(req.params.orderid);
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
