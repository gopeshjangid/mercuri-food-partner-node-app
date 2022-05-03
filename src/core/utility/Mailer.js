import nodemailer from "nodemailer";
import logger from "../Logger";
import config from "../../config/Index";

export default class Mailer {
    transporter;
    options;

    constructor() {
        this.options = config.mail;
        this.createTransporter();
    }

    createTransporter = () => {
        this.transporter = nodemailer.createTransport(this.options);
    }

    connect = async () => {
        return new Promise((resolve, reject) => {
            this.transporter.verify((err) => {
                (err) ? reject(err) : (logger.info("########## Smpt connection initialized ###########"));
            });
        });
    }


    disConnect = async () => {
        this.transporter.close();
        return Promise.resolve(true);
    }

    sendEmail = async (mailOptions) => {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                (error) ? reject(error) : resolve(info);
            });
        });
    }


}
