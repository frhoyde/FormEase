export const userService = {
	getUserByEmail: async (email) => {
		const user =
			await databaseClient.user.findUnique({
				where: { email },
			});
		return user;
	},
};
