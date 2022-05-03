import winston from "winston";
import config from "../config/Index";
class Logger {

    log;
    logger;


    constructor() {
        this.log = config.log || false;  // Rnd
        this.logger = this.initLogger();
    }


    initLogger() {
        const _logger = winston.createLogger();
        _logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.colorize({ all: true })
            ),
        }));

        return _logger;
    }

    info(message) {
        if (this.log) this.logger.info(message);
    }

    warn(message) {
        if (this.log) this.logger.warn(message);
    }

    error(message) {
        if (this.log) this.logger.error(message);
    }

    debug(message) {
        if (this.log) this.logger.debug(message);
    }

}

export default new Logger();
