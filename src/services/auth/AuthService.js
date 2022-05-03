import TokenService from "../../core/utility/TokenService";
import config from "../../config/Index";
import { AuthRepository } from "../../repository/auth/AuthRepository";
import AppError from "../../core/utility/AppError";
import moment from "moment";
import requestIp from "request-ip";
import * as messages from "../../constants/MessageConstant";
import logger from "../../core/Logger";
import bcrypt from "bcryptjs";
import { pwdmismatch, emailerror } from "../../constants/MessageConstant"
export class AuthService {

    static authRepo;
    constructor() {
        this.authRepo = new AuthRepository();
    }

    async login(req) {
        try {
            const body = req.body;
            const tokenService = new TokenService(config.token.privateKey, config.token.options);
            const emailResponse = await this.authRepo.findUser({ email: body.email });
            if (emailResponse?.email) {
                const pwdResponse = await this.authRepo.findUser({ password: body.password, email: body.email });
                if (!pwdResponse) {
                    throw new AppError(messages.errorMessages.passwordIncorrect);
                }
                else {
                    const token = tokenService.sign({});
                    const start_time = moment().utc().format();
                    const end_time = moment().utc().add(config.logoutExpTime, "minutes").format();
                    const usertokendata = {
                        token,
                        user_id: pwdResponse.id,
                        start_time,
                        end_time,
                        isLoggedIn: true,
                        ip: requestIp.getClientIp(req),
                        user_agent: req.headers["user-agent"]
                    };
                    await this.authRepo.saveUserSession(usertokendata);
                    return { token: token, userId: emailResponse.id };
                }
            }
            else {
                throw new AppError(messages.errorMessages.emailIncorrect);
            }
        }
        catch (error) {
            logger.error(`Error in login method of AuthService ${error}`);
            throw error;
        }
    }

    async registerUser(user) {
        try {
            logger.info("Started Execution for registerUser ==>")
            return await this.authRepo.saveUser(user);
        }
        catch (error) {
            logger.error(`Error in registerUser method of AuthService ${error}`);
            throw error;
        }
    }

    async findUserById(userId) {
        try {
            logger.info("Started Execution for findUserById ==>")
            return await this.authRepo.findUser({ id: userId });
        }
        catch (error) {
            logger.error(`Error in findUserById method of AuthService ${error}`);
            throw error;
        }
    }

    async verifyUserToken(token) {
        const tokenData = await this.fetchUserByToken(token);
        if (tokenData && tokenData.end_time) {
            const timedifference = moment(tokenData.end_time).utc().diff(moment().utc().format(), "minutes");
            logger.info(`Time difference is ${timedifference}`);
            if (timedifference > 0 && tokenData.isLoggedIn) {
                //valid token
                const refreshToken = tokenData.token;
                await this.RefreshUserToken(refreshToken);
                return tokenData.user_id;
            }
            else {
                if (tokenData.isLoggedIn) {
                    await this.authRepo.updateIsLoggedInByToken(tokenData.token);
                }
                return false;
            }
        }
        else {
            return false;
        }

    }

    async RefreshUserToken(refreshToken) {
        const endTime = moment().utc().add(config.logoutExpTime, "minutes").format();
        await this.authRepo.updateExpireTime(refreshToken, endTime);
    }

    async fetchUserByToken(token) {
        return this.authRepo.fetchUserByToken(token);
    }

    async getHashedPassword(password) {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        return hash;
    }

    async comparePassword(password, hashedPass) {
        const isValidPass = await bcrypt.compare(password, hashedPass)
        return isValidPass;
    }

    checkPassword(str) {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }

    async resetPwd(pwd) {
        try {
            logger.info("Started Execution for restPwd ==>");
            let userdetail = await this.authRepo.findUser({ email: pwd.email });
            logger.info('userdetails' + userdetail);
            if (userdetail) {

                if (userdetail.password == pwd.oldpassword)
                    return await this.authRepo.updateUserPwd(pwd.newpassword, userdetail.id) == 1 ? "Password Updated Succesfully" : "";
                else
                    return pwdmismatch;
            }
            else {

                return emailerror;
            }
        }
        catch (error) {
            logger.error(`Error in restPwd method of AuthService ${error}`);
            throw error;
        }
    }

    async logOut(token,userid) {
        try {
            logger.info("Started Execution for logOut ==>");
           // console.log('pwddetails',pwd)
           return await this.authRepo.deleteUserByToken(token,userid);
           
        }
        catch (error) {
            logger.error(`Error in logOut method of AuthService ${error}`);
            throw error;
        }
    }






}
