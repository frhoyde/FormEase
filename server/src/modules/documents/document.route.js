import { Router } from "express";
import { documentController } from "./document.controller.js";
export const documentRouter = Router();

documentRouter.get(
	"/all/get",
	documentController.getDocuments
);

documentRouter.post(
	"/create",
	documentController.createDocument
);

documentRouter.get(
	"/get/:id",
	documentController.getDocument
);

documentRouter.patch(
	"/update/:id",
	documentController.updateDocument
);

documentRouter.delete(
	"/delete/:id",
	documentController.deleteDocument
);

documentRouter.delete(
	"/delete",
	documentController.deleteDocumentBulk
);
