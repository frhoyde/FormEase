import { databaseClient } from "../../database/index.js";
export const documentService = {
	createOneDocument: async (document) => {
		const newDocument =
			await databaseClient.document.create({
				data: {
					name: document.name,
					categories: {
						connectOrCreate:
							document.categories.map(
								(category) => ({
									where: { name: category.id },
									create: { name: category.name },
								})
							),
					},
					tags: {
						connectOrCreate: document.tags.map(
							(tag) => ({
								where: { name: tag.id },
								create: { name: tag.name },
							})
						),
					},
					data: document.data,
				},
			});

		return newDocument;
	},
	getDocumentById: async (id) => {
		const document =
			await databaseClient.document.findUnique({
				where: { id },
				include: {
					categories: true,
					tags: true,
					formFieldValues: true,
				},
			});

		return document;
	},
	updateDocumentById: async (id, data) => {
		const updatedDocument =
			await databaseClient.document.update({
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

					formFieldValues: {
						create: data.formFieldValues.map(
							(fieldValue) => ({
								connect: {
									formFieldLabel:
										fieldValue.formFieldId,
								},
								value: fieldValue.value,
							})
						),
					},
				},
			});

		return updatedDocument;
	},
	deleteDocumentById: async (id) => {
		const deletedDocument =
			await databaseClient.document.delete({
				where: { id },
			});

		return deletedDocument;
	},
	getAllDocuments: async () => {
		const documents =
			await databaseClient.document.findMany({
				include: {
					categories: true,
					tags: true,
					formFieldValues: true,
				},
			});
	},
	deleteDocuments: async (ids) => {
		const deletedDocuments =
			await databaseClient.document.deleteMany({
				where: {
					id: {
						in: ids,
					},
				},
			});

		return deletedDocuments;
	},
};
