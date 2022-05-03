import chai, { assert, expect } from "chai";
import *as sinon from "sinon";
import "mocha";
import { stub } from "sinon"
import { MenuRepository } from "../../src/repository/menu/MenuRepository";
import { Menus } from "../../src/models/menu/MenuModel";
import { MenuItem } from "../../src/models/menu/MenuItemModel";
import { MenuCategory } from "../../src/models/menu/MenuCategoriesModel";
import chaiAsPromised from "chai-as-promised";
import { menu } from "../utils/Menu";

describe("Menu Repository", function () {
    chai.use(chaiAsPromised);
    let menuRepository, findAllStub;
    let menuCreateStub, menuItemCreateStub, menuCateCreateStub;
    let menuUpdateStub, menuitemUpdateStub, menuCateUpdateStub;
    let menuDestroyStub, menuItemDestroyStub, menuCateDestroyStub;

    before(() => {
        menuRepository = new MenuRepository();
    });

    after(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.restore();
        findAllStub = stub(Menus, "findAll");
        menuCreateStub = stub(Menus, "create");
        menuItemCreateStub = stub(MenuItem, "create");
        menuCateCreateStub = stub(MenuCategory, "create");
        menuUpdateStub = stub(Menus, "update");
        menuitemUpdateStub = stub(MenuItem, "update");
        menuCateUpdateStub = stub(MenuCategory, "update");
        menuDestroyStub = stub(Menus, "destroy");
        menuItemDestroyStub = stub(MenuItem, "destroy");
        menuCateDestroyStub = stub(MenuCategory, "destroy");
    });

    it("should find Menu By PartnerId", async () => {
        const actualResult = { "id": 1 }
        findAllStub.resolves(actualResult);
        const expectedResult = await menuRepository.findMap(3);
        assert.isTrue(findAllStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should save a Menu", async () => {
        const actualResult = { "id": 1 }
        menuCreateStub.resolves(actualResult);
        const expectedResult = await menuRepository.saveMenu(menu.saveMenuRequest);
        assert.isTrue(menuCreateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should update a Menu", async () => {
        const actualResult = { "id": 1 }
        menuUpdateStub.resolves(actualResult);
        let body = menu.saveMenuRequest;
        body.id = 1;
        const expectedResult = await menuRepository.saveMenu(menu.saveMenuRequest);
        assert.isTrue(menuUpdateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should save a Category", async () => {
        const actualResult = { "id": 1 }
        menuCateCreateStub.resolves(actualResult);
        const expectedResult = await menuRepository.saveCategory(menu.saveMenuCateRequest);
        assert.isTrue(menuCateCreateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should update a Category", async () => {
        const actualResult = { "id": 1 }
        menuCateUpdateStub.resolves(actualResult);
        let body = menu.saveMenuCateRequest;
        body.id = 1;
        const expectedResult = await menuRepository.saveCategory(body);
        assert.isTrue(menuCateUpdateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should save a Menu Item", async () => {
        const actualResult = { "id": 1 }
        menuItemCreateStub.resolves(actualResult);
        const expectedResult = await menuRepository.saveMenuItem(menu.saveMenuItemRequest);
        assert.isTrue(menuItemCreateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should update a Menu Item", async () => {
        const actualResult = { "id": 1 }
        menuitemUpdateStub.resolves(actualResult);
        let body = menu.saveMenuItemRequest;
        body.id = 1;
        const expectedResult = await menuRepository.saveMenuItem(body);
        assert.isTrue(menuitemUpdateStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should delete Menu", async () => {
        const actualResult = { "id": 1 }
        menuDestroyStub.resolves(actualResult);
        const expectedResult = await menuRepository.deleteMenu({ "id": 1 });
        assert.isTrue(menuDestroyStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should delete Category", async () => {
        const actualResult = { "id": 1 }
        menuCateDestroyStub.resolves(actualResult);
        const expectedResult = await menuRepository.deleteCategory({ "id": 1 });
        assert.isTrue(menuCateDestroyStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

    it("should delete Menu Item", async () => {
        const actualResult = { "id": 1 }
        menuItemDestroyStub.resolves(actualResult);
        const expectedResult = await menuRepository.deleteMenuItem({ "id": 1 });
        assert.isTrue(menuItemDestroyStub.calledOnce);
        assert.deepEqual(actualResult, expectedResult);
    });

});