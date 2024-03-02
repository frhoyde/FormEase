export const documentService = {
	createOneDocument: (document) => {
		return { message: "Document created." };
	},
	getDocumentById: (id) => {
		return { message: "Document retrieved." };
	},
	updateDocumentById: (id, data) => {
		return { message: "Document updated." };
	},
	deleteDocumentById: (id) => {
		return { message: "Document deleted." };
	},
	getAllDocuments: () => {
		return { message: "Documents retrieved." };
	},
	deleteDocuments: (ids) => {
		return { message: "Documents deleted." };
	},
};
