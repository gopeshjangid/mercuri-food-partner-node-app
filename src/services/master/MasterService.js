import { MasterRepository } from "../../repository/master/MasterRepository";

export class MasterService {

    static masterRepo;
    constructor() {
        this.masterRepo = new MasterRepository();
    }

    async getPartnerTypes() {
        return await this.masterRepo.getPartnerTypes();
    }

    async getPOSSystemTypes() {
        return await this.masterRepo.getPOSSystemTypes();
    }

    async getOrderTypes() {
        return await this.masterRepo.getOrderTypes();
    }

}
