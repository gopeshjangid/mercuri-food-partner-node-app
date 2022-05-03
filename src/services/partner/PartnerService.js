import logger from "../../core/Logger";
import { MenuRepository } from "../../repository/menu/MenuRepository";
import { PartnerRepository } from "../../repository/partner/PartnerRepository";
import { AccountService } from "../account/AccountService";
import config from "../../config/Index";
import { AwsS3Client } from "../../core/utility/AwsS3Client";
import { allowedExtension, allowedFileSize } from "../../constants/Shared";
import { invalidFileExtension, invalidFileSize } from "../../constants/MessageConstant";

export class PartnerService {

    static partnerRepo;
    static menuRepo;
    static accountService;

    constructor() {
        this.partnerRepo = new PartnerRepository();
        this.menuRepo = new MenuRepository();
        this.accountService = new AccountService();
    }

    async getPartnerList(locationFilters) {
        logger.info('in service getPartnerList');
        if (locationFilters.postalCode) {
            const partnerList = await this.partnerRepo.findPartnerByLocaiton(locationFilters);
            return partnerList;
        } else {
            throw new Error("Missing required field : postalCode");
        }
    }

    async getPartnerDetails({ partnerId }) {
        logger.info('in service getPartnerDetails');
        const partnerList = await this.partnerRepo.findMenuDetailsById(partnerId);
        return partnerList;
    }

    async getPartnerById(userId) {
        logger.info('Start executing service=> getPartnerById');
        return this.partnerRepo.findPartnerById(userId);
    }

    async savePartner(partner) {
        logger.info('Start executing service=> savePartner');
        return this.partnerRepo.savePartnerDetails(partner);
    }

    async uploadProfileImage(files) {
        try {
            logger.info('Start executing service => uploadProfileImage');
            var response = {};
            const s3Init = new AwsS3Client();
            await s3Init.initClient();
            for (var keys in files) {
                await this.fileValidation(files[keys].name, files[keys].size);
                var objectParams = {
                    Bucket: config.aws.bucketName,
                    Key: files[keys].name,
                    Body: files[keys].data
                };
                const res = await s3Init.upload(objectParams);
                response[keys] = res.Location;
            }
            logger.info(`Response after uploading file is ${JSON.stringify(response)}`);
            return response;
        }
        catch (error) {
            logger.error(`Error In: uploadFile method in repository is ${error}`);
            throw error;
        }
    }

    async sendProfileReview(partner) {
        logger.info('Start executing service => sendProfileReview');
        try {
            const res = await this.accountService.createAccountHolder(partner);
            logger.info("Sending mail to user mailMessage");
            await this.wait(8000);
            partner.accountHolderCode = res.accountHolderCode;
            return this.accountService.getOnboardingUrl(partner);
        }
        catch (error) {
            logger.error(`Error In: sendReview method in repository is ${error} `);
            throw error;
        }
    }

    async fileValidation(filename, size) {
        const ext = this.getExtension(filename);
        if (!(allowedExtension.includes(ext))) {
            throw new Error(invalidFileExtension);
        }
        if (size > allowedFileSize) {
            throw new Error(invalidFileSize)
        }
        return true;
    }

    getExtension(filename) {
        var i = filename.lastIndexOf('.');
        return (i < 0) ? '' : filename.substr(i);
    }

    async wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        })
    }
}
