import TokenService from "../../core/utility/TokenService";
import config from "../../config/Index";
import { CustomerRepository } from "../../repository/customer/CustomerRepository";
import AppError from "../../core/utility/AppError";
import moment from "moment";
import requestIp from "request-ip";
import * as messages from "../../constants/MessageConstant";
import logger from "../../core/Logger";
import { AuthService } from "../auth/AuthService";
export class CustomerService {

    static customerRepo;
    static authService;
    constructor() {
        this.customerRepo = new CustomerRepository();
        this.authService = new AuthService;
    }

    async login(req) {
        try {
            const body = req.body;
            const tokenService = new TokenService(config.token.privateKey, config.token.options);
            const emailResponse = await this.customerRepo.findCustomerByEmail(body.email);
            if (emailResponse?.email) {
                // const pwdResponse = await this.customerRepo.findCustomerByPassword(body.password);
                const isValidPass = await this.authService.comparePassword(body.password, emailResponse.password);
                if (!isValidPass) {
                    throw new AppError(messages.errorMessages.passwordIncorrect);
                }
                else {
                    const token = tokenService.sign({});
                    const start_time = moment().utc().format();
                    const end_time = moment().utc().add(config.logoutExpTime, "minutes").format();
                    const usertokendata = {
                        token,
                        user_id: emailResponse.id,
                        start_time,
                        end_time,
                        isLoggedIn: true,
                        ip: requestIp.getClientIp(req),
                        customer_agent: req.headers["customer-agent"]
                    };
                    await this.customerRepo.saveCustomerSession(usertokendata);
                    return { token: token, customerId: emailResponse.id };
                }
            }
            else {
                throw new AppError(messages.errorMessages.emailIncorrect);
            }
        }
        catch (error) {
            logger.error(`Error in login method of CustomerService ${error}`);
            throw error;
        }
    }

    async registerCustomer(customer) {
        try {
            logger.info("Started Execution for registerCustomer ==>")
            let { password } = customer;
            const validatePasswordRegex = this.authService.checkPassword(password)
            if (!validatePasswordRegex) {
                throw new AppError(messages.errorMessages.passwordFormatError);
            }
            customer.password = await this.authService.getHashedPassword(password);
            return await this.customerRepo.saveCustomer(customer);
        }
        catch (error) {
            logger.error(`Error in registerCustomer method of CustomerService ${error}`);
            throw error;
        }
    }

    async findCustomerById(customerId) {
        logger.info("Started Execution for findCustomerById ==>")
        return await this.customerRepo.findCustomerById(customerId);
    }

    async resetPassword(passwordResetReq) {
        try {
            logger.info("Started Execution for resetPassword ==>")
            const { id, ...customer } = passwordResetReq;
            //get customer data from db
            const customerDb = await this.findCustomerById(id);
            // validate old password
            const isValidPass = await this.authService.comparePassword(customer.password, customerDb.password);
            if (!isValidPass) {
                throw new AppError(messages.errorMessages.oldPasswordIncorrect);
            }
            if (customer.newPassword != customer.confirmNewPassword) {
                throw new AppError(messages.errorMessages.passwordVerificationError);
            }
            if (customer.newPassword === customer.password) {
                throw new AppError(messages.errorMessages.passwordRepitionError);
            }
            const validatePasswordRegex = this.authService.checkPassword(customer.newPassword)
            if (!validatePasswordRegex) {
                throw new AppError(messages.errorMessages.passwordFormatError);
            }
            //Hash the updated password
            const hashedPassword = await this.authService.getHashedPassword(customer.newPassword);
            return await this.customerRepo.update(id, { password: hashedPassword });
        }
        catch (error) {
            logger.error(`Error in resetPassword method of CustomerService ${error}`);
            throw error;
        }
    }

    async updateCustomerDetails(customerReq) {
        logger.info("Started Execution for updateCustomerDetails ==>")
        const { id, ...customer } = customerReq;
        await this.customerRepo.update(id, customer);
        return await this.customerRepo.findCustomerById(id);
    }

}
