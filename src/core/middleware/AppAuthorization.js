import ResponseMessage from "../utility/ReponseMessage";
import { appCode } from "../constants/AppCode";
import { httpStatus } from "../constants/HttpStatusCode";
import config from "../../config/Index";
import {
    unAuthorisedMessage,
    tokenNotFoundMessage,
    invalidToken
} from "../../constants/MessageConstant";
import logger from "../Logger";
import AppError from "../utility/AppError";
import crypto from "crypto";
import path from "path";
import fs from "fs";
const { secretKey } = config.authApp;
export const authorizationApp = () => {
    return async (
        req,
        res,
        next
    ) => {
        try {
            let bearerToken;
            const obj = new ResponseMessage();
            obj.httpStatusCode = httpStatus.unAuthorised;
            obj.appCode = appCode.error;

            if (req.query && Object.prototype.hasOwnProperty.call(req.query, "access_token")) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // @** Get bearer token from header
            if (
                Object.prototype.hasOwnProperty.call(req.headers, "authorization") ||
                Object.prototype.hasOwnProperty.call(req.headers, "x-access-token")) {
                const token = req.headers.authorization;
                if (token && token.startsWith("Bearer ")) {
                    bearerToken = token.split(" ")[1];
                }
            }
            if (!bearerToken) {
                obj.message = tokenNotFoundMessage;
                return res.status(httpStatus.unAuthorised).send(obj);
            } else {
                try {
                    const tokenVal = await verifyUserToken(bearerToken);
                    if (tokenVal !== secretKey) {
                        throw new AppError(invalidToken);
                    }
                    next(); //@ by pass to the next request or middleware
                } catch (tokenError) {
                    logger.error(`###tokenError ${JSON.stringify(tokenError)}`);
                    obj.message = unAuthorisedMessage;
                    return res.status(httpStatus.unAuthorised).send(obj);
                }
            }
        } catch (error) {
            next(error);
        }
    };
};

const verifyUserToken = async (encryptedData) => {
    const decryptedData = decryptStringWithRsaPrivateKey(encryptedData, "private.pem")
    // The decrypted data is of the Buffer type, which we can convert to a
    // string to reveal the original data
    return decryptedData.toString();
}


var decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt({ key: privateKey.toString(), passphrase: "test-passphrase" }, buffer);
    return decrypted.toString("utf8");
};
