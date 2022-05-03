import chai, { assert } from "chai";
import *as sinon from "sinon";
import "mocha";
import { stub } from "sinon"
import { AuthRepository } from "../../src/repository/auth/AuthRepository";
import { UserAuth } from "../../src/models/user/UserAuth";
import { User } from "../../src/models/user/User";
import chaiAsPromised from "chai-as-promised";

describe("Auth Repository", function () {
    chai.use(chaiAsPromised);
    let authRepository, findOneUserStub, findUserByIdAuthStub, createAuthStub, updateAuthStub, createUserStub;

    before(() => {
        authRepository = new AuthRepository();
    });

    after(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.restore();
        findOneUserStub = stub(User, "findOne");
        findUserByIdAuthStub = stub(UserAuth, "findOne");
        createAuthStub = stub(UserAuth, "create");
       // updateAuthStub = stub(UserAuth, "updateOne");
        createUserStub = stub(User, "create");
    });

    it("should find User on basis of condition", async () => {
        const actualResult = { "id": 1 }
        findOneUserStub.resolves(actualResult);
        const expectedResult = await authRepository.findUser({ email: "test@gmail.com" });
        assert.isTrue(findOneUserStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should find logged in User", async () => {
        const actualResult = { "id": 1 }
        findUserByIdAuthStub.resolves(actualResult);
        const expectedResult = await authRepository.findUserByIdAuth(1);
        assert.isTrue(findUserByIdAuthStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should save User Session", async () => {
        const actualResult = { "id": 1 }
        createAuthStub.resolves(actualResult);
        const expectedResult = await authRepository.saveUserSession(1);
        assert.isTrue(createAuthStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    // it("should update session", async () => {
    //     const actualResult = { "id": 1 }
    //     updateAuthStub.resolves(actualResult);
    //     const expectedResult = await authRepository.updateIsLoggedInByUserId(1);
    //     assert.isTrue(updateAuthStub.calledOnce);
    //     assert.deepEqual(actualResult, expectedResult);
    // });


    it("should save User", async () => {
        const actualResult = {
            "firstName": "test",
            "lastName": "test",
            "email": "test.sample@encora.com",
            "password": "test",
            "partnerName": "test"
        }
        createUserStub.resolves(actualResult);
        const expectedResult = await authRepository.saveUser(actualResult);
        assert.isTrue(createUserStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });




});