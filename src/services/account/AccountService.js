
import logger from "../../core/Logger";
import HttpRequest from "../../core/utility/HttpRequest";
import config from "../../config/Index";

export class AccountService {

    static httpReq;
    static headers;
    constructor() {
        this.httpReq = new HttpRequest;
        this.headers = {
            headers: {
                'Authorization': `Basic ${config.adyen.token}`,
                'Content-Type': 'application/json'
            }
        }
    }

    async createAccountHolder(body) {
        try {
            const reqBody = await this.prepareReqBody(body);
            logger.info(`Headers are ${JSON.stringify(this.headers)}`);
            const response = await this.httpReq.create(config.adyen.createAccountUrl, reqBody, this.headers);
            logger.info(`Response after API call is ${JSON.stringify(response)}`);
            return response;
        }
        catch (error) {
            logger.error(`Error in createAccountHolder method of AccountService ${JSON.stringify(error)}`);
            throw error;
        }
    }

    async getOnboardingUrl(body) {
        try {
            const boardingreq = {
                "accountHolderCode": body.accountHolderCode,
                "returnUrl": body.returnUrl
            };
            logger.info(`BODY IS ${JSON.stringify(boardingreq)}`);
            const res = await this.httpReq.create(config.adyen.onBoardingUrl, JSON.stringify(boardingreq), this.headers);
            logger.info(`Response after getOnboardingUrl API call is ${JSON.stringify(res)}`);
            return res;
        }
        catch (error) {
            logger.error(`Error in getOnboardingUrl method of AccountService ${JSON.stringify(error)}`);
            throw error;
        }
    }

    async prepareReqBody(body) {
        const reqBody = {
            "accountHolderCode": body.partnerName.substring(0, 3) + this.genRand(),
            "accountHolderDetails": {
                "address": {
                    "country": "US",
                    "city": body.city,
                    "houseNumberOrName": body.address2,
                    "postalCode": body.zipCode,
                    "stateOrProvince": "NJ", // to be discussed
                    "street": body.address1
                },
                "businessDetails": {
                    "legalBusinessName": body.partnerName,
                    "shareholders": [
                        {
                            "name": {
                                "firstName": body.firstName,
                                "gender": "UNKNOWN",
                                "lastName": body.lastName
                            },
                            "address": {
                                "country": "US"
                            }
                        }
                    ]
                },
                "email": body.email,
                //"fullPhoneNumber": body.phone
            },
            "legalEntity": "Business"
        };
        logger.info(JSON.stringify(reqBody));
        return reqBody;
    }

    genRand() {
        return Math.floor(Math.random() * 89999 + 10000);
    }

}
