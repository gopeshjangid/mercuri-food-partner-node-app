import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { PartnerService } from "../../services/partner/PartnerService";
import { partner } from "../../constants/ErrorConstant";

export default class PartnerController extends BaseController {

    async getPartnerList(req, res, next) {
        try {
            logger.info("In Controller of getPartnerList");
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.getPartnerList(req.body);
            if (data) {
                responseObj.data = data;
                responseObj.message = `${data.length} records found`;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getPartnerDetails(req, res, next) {
        try {
            logger.info("In Controller of getPartnerDetails");
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.getPartnerDetails(req.query);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getPartnerById(req, res, next) {
        try {
            logger.info("In Controller of getPartnerById");
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.getPartnerById(req.params.id);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error({ error });
            next(error);
        }
    }

    async savePartner(req, res, next) {
        try {
            logger.info(`In Controller of savePartner`);
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.savePartner(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error({ error });
            error.message = partner.savePartner;
            next(error);
        }
    }

    async uploadImages(req, res, next) {
        try {
            logger.info(`In Controller of uploadProfileImages`);
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.uploadProfileImage(req.files);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error({ error });
            error.message = partner.uploadImages;
            next(error);
        }
    }

    async sendProfileReview(req, res, next) {
        try {
            logger.info(`In Controller of sendProfileReview`);
            const responseObj = new ReponseMessage();
            const partnerService = new PartnerService();
            const data = await partnerService.sendProfileReview(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            error.message = partner.profileReview;
            logger.error({ error });
            next(error);
        }
    }
}
