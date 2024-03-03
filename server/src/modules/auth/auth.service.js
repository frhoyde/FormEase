import argon2 from "argon2";
export const authService = {
	register: async (user) => {
		const hashedPassword = await argon2.hash(
			user.password
		);

		const newUser =
			await databaseClient.user.create({
				data: {
					email: user.email,
					password: hashedPassword,
				},
			});
		return newUser;
	},
};
