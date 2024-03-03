import { config } from "dotenv";

config();

export const env = {
	port: process.env.PORT || 8000,
	databaseURL: process.env.DATABASE_URL,
	secret: process.env.SECRET,
};
