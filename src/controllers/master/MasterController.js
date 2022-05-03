import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { MasterService } from "../../services/master/MasterService";

export default class MasterController extends BaseController {

    async getPartnerTypes(req, res, next) {
        try {
            logger.info("Started Exceution for getPartnerTypes Controller");
            const responseObj = new ReponseMessage();
            const masterService = new MasterService();
            const data = await masterService.getPartnerTypes();
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getPOSSystemTypes(req, res, next) {
        try {
            logger.info("Started Exceution for getPOSSystemTypes Controller");
            const masterService = new MasterService();
            const responseObj = new ReponseMessage();
            const data = await masterService.getPOSSystemTypes();
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getOrderTypes(req, res, next) {
        try {
            logger.info("Started Exceution for getOrderTypes Controller");
            const masterService = new MasterService();
            const responseObj = new ReponseMessage();
            const data = await masterService.getOrderTypes();
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