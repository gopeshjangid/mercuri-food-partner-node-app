import { Client, Config, CheckoutAPI } from '@adyen/api-library';
import config from '../../config/Index';

export class AdyenService {

    static adyenConfig;
    static client;
    static checkout;

    constructor() {
        this.setAdyenConfigs();
        this.client = new Client({ config: this.adyenConfig });
        this.checkout = new CheckoutAPI(this.client);
    }

    setAdyenConfigs = () => {
        this.adyenConfig = new Config();
        this.adyenConfig.apiKey = config.adyen.apiKey;
        this.adyenConfig.environment = config.adyen.env;
    }

    getPaymentMethods = async (paymentMethodReq) => {
        return new Promise((resolve, reject) => {
            this.checkout.paymentMethods({
                ...paymentMethodReq
            }).then(res => resolve(res)).catch(err => reject(err));
        });
    }

    makePayment = async (paymentReq) => {
        return new Promise((resolve, reject) => {
            this.checkout.payments(paymentReq).then(res => {
                resolve(res)
            }).catch(err => reject(err));
        })
    }

}
