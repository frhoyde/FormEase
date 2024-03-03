export const userService = {
	getUserById: async (id) => {
		const user =
			await databaseClient.user.findUnique({
				where: { id },
			});
		return user;
	},
};
