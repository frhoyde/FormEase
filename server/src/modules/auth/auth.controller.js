app.post("/register", function (req, res) {
	User.register(
		new User({
			email: req.body.email,
			username: req.body.username,
		}),
		req.body.password,
		function (err, msg) {
			if (err) {
				res.send(err);
			} else {
				res.send({ message: "Successful" });
			}
		}
	);
});

app.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login-failure",
		successRedirect: "/login-success",
	}),
	(err, req, res, next) => {
		if (err) next(err);
	}
);

app.get("/login-failure", (req, res, next) => {
	console.log(req.session);
	res.send("Login Attempt Failed.");
});

app.get("/login-success", (req, res, next) => {
	console.log(req.session);
	res.send("Login Attempt was successful.");
});
