import chai, { assert, expect } from "chai";
import *as sinon from "sinon";
import "mocha";
import { stub } from "sinon"
import { PartnerRepository } from "../../src/repository/partner/PartnerRepository";
import { User } from "../../src/models/user/User";
import { Partner } from "../../src/models/partner/Partner";
import { PartnerSchedule } from "../../src/models/partner/PartnerSchedule";
import { PartnerOrderType } from "../../src/models/partner/PartnerOrderType";
import chaiAsPromised from "chai-as-promised";
import { partner } from "../utils/Partner";

describe("Partner Repository", function () {
    chai.use(chaiAsPromised);
    let partnerRepository, findOneStub, findAllStub, findOnePartnerStub;
    let partnerCreateStub, partnerScheduleStub, partnerOrderStub;
    let partnerUpdateStub, partnerScheduleUpdateStub, partnerOrderDestroyStub;

    before(() => {
        partnerRepository = new PartnerRepository();
    });

    after(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.restore();
        findOneStub = stub(User, "findOne");
        findAllStub = stub(Partner, "findAll");
        findOnePartnerStub = stub(Partner, "findOne");
        partnerCreateStub = stub(Partner, "create");
        partnerScheduleStub = stub(PartnerSchedule, "create");
        partnerOrderStub = stub(PartnerOrderType, "bulkCreate");
        partnerUpdateStub = stub(Partner, "update");
        partnerScheduleUpdateStub = stub(PartnerSchedule, "update");
        partnerOrderDestroyStub = stub(PartnerOrderType, "destroy");
    });

    it("should find Partner by Location", async () => {
        const actualResult = { "id": 1 }
        findAllStub.resolves(actualResult);
        const expectedResult = await partnerRepository.findPartnerByLocaiton({ postalCode: "401303", locality: null, address: null });
        assert.isTrue(findAllStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });


    it("should find Partner by userId", async () => {
        const actualResult = { "id": 1 }
        findOneStub.resolves(actualResult);
        const expectedResult = await partnerRepository.findPartnerById(1);
        assert.isTrue(findOneStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should find Menu by PartnerId", async () => {
        const actualResult = { "id": 1 }
        findOnePartnerStub.resolves(actualResult);
        const expectedResult = await partnerRepository.findMenuDetailsById(1);
        assert.isTrue(findOnePartnerStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should save Partner Details", async () => {
        const actualResult = true;
        partnerCreateStub.resolves(actualResult);
        partnerScheduleStub.resolves(actualResult);
        partnerOrderStub.resolves(actualResult);
        const expectedResult = await partnerRepository.savePartnerDetails(partner.savePartnerRequest);
        assert.isTrue(partnerCreateStub.calledOnce);
        assert.isTrue(partnerScheduleStub.calledOnce);
        assert.isTrue(partnerOrderStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should update Partner Details", async () => {
        const actualResult = true;
        partnerUpdateStub.resolves(actualResult);
        partnerScheduleUpdateStub.resolves(actualResult);
        partnerOrderDestroyStub.resolves(actualResult);
        partnerOrderStub.resolves(actualResult);
        const body = partner.savePartnerRequest;
        body.id = 1;
        const expectedResult = await partnerRepository.savePartnerDetails(body);
        assert.isTrue(partnerUpdateStub.calledOnce);
        assert.isTrue(partnerScheduleUpdateStub.calledOnce);
        assert.isTrue(partnerOrderDestroyStub.calledOnce);
        assert.isTrue(partnerOrderStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should throw error while saving Partner Details", async () => {
        const actualResult = { "id": 1 }
        partnerUpdateStub.rejects("Parsing Error");
        return chai.expect(await partnerRepository.savePartnerDetails(partner.savePartnerRequest)).to.be.rejected;
    });

});