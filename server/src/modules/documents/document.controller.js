export const documentController = {
	createDocument: async (req, res) => {
		try {
			const data = req.body;

			const doc =
				await documentService.createOneDocument(
					data
				);
			return res.status(201).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	getDocument: async (req, res) => {
		try {
			const id = req.params.id;

			const doc =
				await documentService.getDocumentById(id);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	updateDocument: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const doc =
				await documentService.updateDocumentById(
					id,
					data
				);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteDocument: async (req, res) => {
		try {
			const id = req.params.id;
			const doc =
				await documentService.deleteDocumentById(
					id
				);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	getDocuments: async (req, res) => {
		try {
			const docs =
				await documentService.getAllDocuments();

			return res.status(200).json(docs);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteDocumentBulk: async (req, res) => {
		try {
			const { ids } = req.body;

			const docs =
				await documentService.deleteDocumentsBulk(
					ids
				);

			return res.status(200).json(docs);
		} catch (error) {
			throw new Error(error);
		}
	},
};
