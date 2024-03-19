import { Router } from "express";

import { formController } from "./form.controller.js";

export const formRouter = Router();

formRouter.get(
	"/all/get",
	formController.getForms
);

formRouter.get(
	"/category/get",
	formController.getCategories
);

formRouter.get(
	"/tag/get",
	formController.getTags
);

formRouter.post(
	"/create",
	formController.createForm
);

formRouter.get(
	"/get/:id",
	formController.getForm
);

formRouter.patch(
	"/update/:id",
	formController.updateForm
);

formRouter.delete(
	"/delete/:id",
	formController.deleteForm
);

formRouter.delete(
	"/delete",
	formController.deleteForms
);
