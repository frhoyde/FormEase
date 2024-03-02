export const storageController = {
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

	getDocument: (req, res) => {
		try {
			const id = req.params.id;

			const doc =
				documentService.getDocumentById(id);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	updateDocument: (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const doc =
				documentService.updateDocumentById(
					id,
					data
				);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteDocument: (req, res) => {
		try {
			const id = req.params.id;
			const doc =
				documentService.deleteDocumentById(id);

			return res.status(200).json(doc);
		} catch (error) {
			throw new Error(error);
		}
	},

	getDocuments: (req, res) => {
		try {
			const docs =
				documentService.getAllDocuments();

			return res.status(200).json(docs);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteDocumentBulk: (req, res) => {
		try {
		} catch (error) {
			throw new Error(error);
		}
	},
};
