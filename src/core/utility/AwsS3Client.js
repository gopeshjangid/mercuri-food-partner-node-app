import AWS from "aws-sdk";
import logger from "../../core/Logger";

export class AwsS3Client {

    client;
    credentials;
    constructor() { }

    async initClient() {
        try {
            AWS.config.getCredentials((err) => {
                if (err) logger.error(err.stack);
                else {
                    this.credentials = AWS.config.credentials;
                }
            });
            this.client = new AWS.S3(this.credentials);
        } catch (error) {
            logger.error(`Error in initClient method ${error}`);
            throw new Error(error);
        }
    }

    upload = async (args) => (
        new Promise((resolve, reject) => {
            this.client.upload(args, (error, data) => {
                if (error) {
                    logger.error(`In Error while uploading ${error}`);
                    reject(error);
                }
                resolve(data);
            });
        })
    );


    get = async (args) => (
        new Promise((resolve, reject) => {
            this.client.getObject(args, (error, data) => {
                (error) ? reject(error) : resolve(data);
            });
        })
    );
}

