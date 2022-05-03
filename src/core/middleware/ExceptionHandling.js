import ResponseMessage from "../utility/ReponseMessage";
import { appCode } from "../constants/AppCode";
import { httpStatus } from "../constants/HttpStatusCode";
import CreateResponse from "../utility/CreateResponse";

// const { traceError } = require("../utility/helper");


export const exceptionHandling = (err, req, res, next) => {
    const createResponse = new CreateResponse();
    const obj = new ResponseMessage();
    obj.appCode = appCode.success;
    obj.httpStatusCode = httpStatus.internalServerError;
    obj.message = err.message;
    createResponse.error(res, obj);
};
