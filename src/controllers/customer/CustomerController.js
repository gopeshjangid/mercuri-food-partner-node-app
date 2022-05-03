import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { CustomerService } from "../../services/customer/CustomerService";
import { updateMessage } from "../../constants/MessageConstant";

export default class CustomerController extends BaseController {

    async login(req, res, next) {
        try {
            logger.info("In Controller of login")
            const responseObj = new ReponseMessage();
            const customerService = new CustomerService();
            const data = await customerService.login(req);
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

    async registerCustomer(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.registerCustomer(body);
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


    async findCustomerById(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.findCustomerById(req.params.id);
            logger.info(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async updateCustomerDetails(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.updateCustomerDetails(body);
            logger.info(data);
            if (data) {
                responseObj.message = updateMessage;
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            logger.info("In Controller of resetPassword")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.resetPassword(body);
            logger.debug(data);
            if (data) {
                responseObj.message = updateMessage;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
