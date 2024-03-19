import { databaseClient } from "../../database/index.js";
export const formService = {
	createFormTemplate: async (formTemplate) => {
		const form =
			await databaseClient.formTemplate.create({
				data: {
					name: formTemplate.name,
					categories: {
						connectOrCreate:
							formTemplate.categories.map(
								(category) => ({
									where: { id: category.id },
									create: { name: category.name },
								})
							),
					},
					tags: {
						connectOrCreate:
							formTemplate.tags.map((tag) => ({
								where: { id: tag.id },
								create: { name: tag.name },
							})),
					},
					schema: formTemplate.schema,
					basePdf: formTemplate.basePdf,
					sampledata: formTemplate.sampledata,
					columns: formTemplate.columns,
				},
			});
	},

	getFormTemplateById: (id) => {
		const formTemplate =
			databaseClient.formTemplate.findUnique({
				where: { id },
				include: {
					categories: true,
					tags: true,
					schema: true,
					basePdf: true,
					sampledata: true,
					columns: true,
				},
			});

		return formTemplate;
	},

	getAllCategories: () => {
		const categories =
			databaseClient.category.findMany({
				select: {
					name: true,
					id: true,
				},
			});
		return categories;
	},

	getAllTags: () => {
		const tags = databaseClient.tag.findMany({
			select: {
				name: true,
				id: true,
			},
		});

		return tags;
	},

	updateFormTemplateById: (id, data) => {
		const formTemplate =
			databaseClient.formTemplate.update({
				where: { id },
				data: {
					name: data.name,
					categories: {
						connectOrCreate: data.categories.map(
							(category) => ({
								where: { name: category.id },
								create: { name: category.name },
							})
						),
					},
					tags: {
						connectOrCreate: data.tags.map(
							(tag) => ({
								where: { name: tag.id },
								create: { name: tag.name },
							})
						),
					},
					schema: data.schema,
					basePdf: data.basePdf,
					sampledata: data.sampledata,
					columns: data.columns,
				},
			});

		return formTemplate;
	},
	deleteFormTemplateById: (id) => {
		const formTemplate =
			databaseClient.formTemplate.delete({
				where: { id },
			});

		return formTemplate;
	},
	getAllFormTemplates: () => {
		const forms =
			databaseClient.formTemplate.findMany({
				include: {
					categories: true,
					tags: true,
					schema: true,
					basePdf: true,
					sampledata: true,
					columns: true,
				},
			});

		return forms;
	},
	deleteFormTemplatesBulk: (ids) => {
		const forms =
			databaseClient.formTemplate.deleteMany({
				where: {
					id: {
						in: ids,
					},
				},
			});

		return forms;
	},
};
