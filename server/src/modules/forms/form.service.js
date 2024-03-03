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
									where: { name: category.id },
									create: { name: category.name },
								})
							),
					},
					tags: {
						connectOrCreate:
							formTemplate.tags.map((tag) => ({
								where: { name: tag.id },
								create: { name: tag.name },
							})),
					},

					formFieldGroups: {
						create:
							formTemplate.formFieldGroups.map(
								(group) => ({
									name: group.name,
									formFields: {
										create: group.formFields.map(
											(field) => ({
												name: field.name,
												type: field.type,
												required: field.required,
												options: {
													create:
														field.options.map(
															(option) => ({
																name: option.name,
															})
														),
												},
											})
										),
									},
								})
							),
					},
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
					formFieldGroups: {
						include: {
							formFields: {
								include: {
									options: true,
								},
							},
						},
					},
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
					formFieldGroups: {
						create: data.formFieldGroups.map(
							(group) => ({
								name: group.name,
								formFields: {
									create: group.formFields.map(
										(field) => ({
											name: field.name,
											type: field.type,
											required: field.required,
											options: {
												create: field.options.map(
													(option) => ({
														name: option.name,
													})
												),
											},
										})
									),
								},
							})
						),
					},
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
					formFieldGroups: {
						include: {
							formFields: {
								include: {
									options: true,
								},
							},
						},
					},
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
