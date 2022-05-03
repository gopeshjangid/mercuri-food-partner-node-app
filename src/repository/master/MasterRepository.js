import { PartnerType } from "../../models/master/PartnerType";
import { OrderType } from "../../models/master/OrderType";
import { PosSystemType } from "../../models/master/PosSystemType";

export class MasterRepository {

    async getPartnerTypes() {
        return await PartnerType.findAll({attributes: ['id', 'value']});
    }

    async getOrderTypes() {
        return await OrderType.findAll({attributes: ['id', 'value']});
    }

    async getPOSSystemTypes() {
        return await PosSystemType.findAll({attributes: ['id', 'value']});
    }

}
