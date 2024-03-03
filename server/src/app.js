import cors from "cors";
import express from "express";
import morganBody from "morgan-body";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import { env } from "./config.js";
// Router imports

import { config } from "dotenv";
import { userService } from "./modules/user/user.service.js";
config();
// Initialization
const app = express();

// Configuration
app.set("port", env.port);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: env.secret,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
passport.use(
	new LocalStrategy(
		async (email, password, done) => {
			const user =
				userService.getUserByEmail(email);
			const passwordMatch = await argon2.verify(
				user.password,
				password
			);
			if (!user || !passwordMatch) {
				return done(null, false, {
					message:
						"Incorrect username or password",
				});
			}
			return done(null, user);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const user = users.find((u) => u.id === id);
	done(null, user);
});

// HTTP loggers
morganBody(app, {
	logReqDateTime: false,
	logReqUserAgent: false,
	logIP: false,
	maxBodyLength: 1024,
});

// Routes
app.get("/are-you-ok", (req, res) => {
	return res
		.status(200)
		.send({ message: "Yeah, I am OK." });
});

export default app;
