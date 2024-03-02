import cors from "cors";
import express from "express";
import morganBody from "morgan-body";
import minifyHTML from "express-minify-html";

import { env } from "./config.js";
// Router imports

import { config } from "dotenv";
config();
// Initialization
const app = express();

// Configuration
app.set("port", env.port);

// Middlewares
app.use(cors());
app.use(express.json());
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
