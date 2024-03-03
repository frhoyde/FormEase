import passport from "passport";
import { authService } from "./auth.service.js";
import { userService } from "../user/user.service.js";
export const authController = {
	register: async (req, res) => {
		try {
			const user = req.body;
			const userExists =
				await userService.getUserByEmail(
					user.email
				);

			if (userExists) {
				return res.status(400).json({
					message: "User already exists",
				});
			}

			const newUser =
				await authService.register(user);

			req.logIn(newUser, (err) => {
				if (err) {
					return next(err);
				}
				return res.json({
					message: "Registration successful",
					user: newUser,
				});
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	login: (req, res, next) => {
		passport.authenticate(
			"local",
			(err, user, info) => {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.status(401).json({
						message: "Invalid credentials",
					});
				}
				req.logIn(user, (err) => {
					if (err) {
						return next(err);
					}
					return res.json({
						message: "Login successful",
						user,
					});
				});
			}
		)(req, res, next);
	},

	logout: (req, res) => {
		req.logout();
		res.json({ message: "Logout successful" });
	},
};
