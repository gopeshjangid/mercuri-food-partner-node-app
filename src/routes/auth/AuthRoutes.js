import express from "express";
import AuthController from "../../controllers/auth/AuthController";

export class AuthRoutes {
        static configureRoutes() {
                const controller = new AuthController();
                const router = express.Router();
                router.get("/:id", controller.findUserById);
                router.post("/login", controller.login);
                router.post("/registerUser", controller.registerUser);
                router.post("/resetpwd", controller.restPwd);
                router.get("/logout/:id", controller.logOut);
                return router;
        }
}