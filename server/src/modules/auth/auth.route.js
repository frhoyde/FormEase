import { Router } from "express";

const authRouter = Router();

import authController from "./auth.controller.js";

authRouter.post(
	"/register",
	authController.register
);

authRouter.get("/login", authController.login);

authRouter.get("/logout", authController.logout);
