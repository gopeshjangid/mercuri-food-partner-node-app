import chai, { assert } from "chai";
import *as sinon from "sinon";
import "mocha";
import { stub } from "sinon"
import { MasterRepository } from "../../src/repository/master/MasterRepository";
import { PartnerType } from "../../src/models/master/PartnerType";
import { OrderType } from "../../src/models/master/OrderType";
import { PosSystemType } from "../../src/models/master/PosSystemType";
import chaiAsPromised from "chai-as-promised";

describe("Master Repository", function () {
    chai.use(chaiAsPromised);
    let masterRepository, findAllPartnertub, findAllOrderStub, findAllPosStub;

    before(() => {
        masterRepository = new MasterRepository();
    });

    after(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.restore();
        findAllPartnertub = stub(PartnerType, "findAll");
        findAllOrderStub = stub(OrderType, "findAll");
        findAllPosStub = stub(PosSystemType, "findAll");
    });

    it("should find All the Partner Types", async () => {
        const actualResult = { "id": 1 }
        findAllPartnertub.resolves(actualResult);
        const expectedResult = await masterRepository.getPartnerTypes();
        assert.isTrue(findAllPartnertub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should find All the Order Types", async () => {
        const actualResult = { "id": 1 }
        findAllOrderStub.resolves(actualResult);
        const expectedResult = await masterRepository.getOrderTypes();
        assert.isTrue(findAllOrderStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should find All the Partner Types", async () => {
        const actualResult = { "id": 1 }
        findAllPosStub.resolves(actualResult);
        const expectedResult = await masterRepository.getPOSSystemTypes();
        assert.isTrue(findAllPosStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });



});