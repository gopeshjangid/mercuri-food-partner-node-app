import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { AuthService } from "../../services/auth/AuthService";
import { auth } from "../../constants/ErrorConstant";
import {  httpStatus} from "../../core/constants/HttpStatusCode";
import {
    
    tokenNotFoundMessage,
    
} from "../../constants/MessageConstant";

export default class AuthController extends BaseController {

    async login(req, res, next) {
        try {
            logger.info("In Controller of login")
            const responseObj = new ReponseMessage();
            const authService = new AuthService();
            const data = await authService.login(req);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            error.message = auth.login;
            next(error);
        }
    }

    async registerUser(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.registerUser(body);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            error.message = auth.registerUser;
            logger.error(error);
            next(error);
        }
    }


    async findUserById(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.findUserById(req.params.id);
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

    async restPwd(req, res, next) {
        try {
            logger.info("In Controller of restPwd")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const body = req.body;
            const data = await authService.resetPwd(body);
            logger.debug(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            error.message = auth.passwordReset;
            logger.error(error);
            next(error);
        }
    }
    

    
    async logOut(req, res, next) {
        try {
            logger.info("In Controller of logOut")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            let bearerToken;
            //const obj = new ResponseMessage();
            const userid=req.params.id;
            // if (req.query && req.query.hasOwnProperty("access_token")) {
            //     req.headers.authorization = `Bearer ${req.query.access_token}`;
            // }
            // @** Get bearer token from header
           
            if (
                Object.prototype.hasOwnProperty.call(req.headers, "authorization")
            ) {
                
                const token = req.headers.authorization;
                if (token && token.startsWith("Bearer ")) {
                    bearerToken = token.split(" ")[1];
                }
            }
            if (!bearerToken) {
                responseObj.message = tokenNotFoundMessage;
                return res.status(httpStatus.unAuthorised).send(responseObj);
            } else {
                const data = await authService.logOut(bearerToken,userid);
                  //console.log('data12',data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

}
