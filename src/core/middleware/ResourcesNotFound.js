import ResponseMessage from "../utility/ReponseMessage";
import { appCode } from "../constants/AppCode";
import { httpStatus } from "../constants/HttpStatusCode";

// ***@ no routes matched from the among register this function order should be last route

export const resourceNotFound = (req, res) => {
    const obj = new ResponseMessage();
    obj.appCode = appCode.error;
    obj.httpStatusCode = httpStatus.notFound;
    obj.message = "resource not found";
    res.status(httpStatus.notFound).send(obj);
};
