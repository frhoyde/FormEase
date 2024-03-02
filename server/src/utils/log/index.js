import morgan from "morgan";
import { consoleLogger } from "./console-logger.util.js";

export const getDefaultLogger = () => {
	return consoleLogger;
};

const morganRequestLoggerMiddleware = morgan(
	(tokens, req, res) => {
		return JSON.stringify({
			method: tokens.method(req, res),
			url: tokens["url"](req, res)?.split("?")[0],
			status: Number.parseFloat(
				tokens.status(req, res) || ""
			),
			content_length: tokens.res(
				req,
				res,
				"content-length"
			),
			response_time: Number.parseFloat(
				tokens["response-time"](req, res) || ""
			),
			user_agent: tokens["user-agent"](req, res),
			remote_address: tokens["remote-addr"](
				req,
				res
			),
		});
	},
	{
		stream: {
			write: (message) => {
				const data = JSON.parse(message);
				getDefaultLogger().http(data);
			},
		},
		skip: function (req, res) {
			if (req.url === "/are-you-ok") {
				return true;
			} else {
				return false;
			}
		},
	}
);

export const getRequestLogger = () => {
	return morganRequestLoggerMiddleware;
};
