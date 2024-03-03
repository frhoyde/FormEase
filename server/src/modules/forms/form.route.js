import { Router } from "express";

import formController from "./form.controller.js";

const formRouter = Router();

formRouter.get(
	"/all/get",
	formController.getForms
);

formRouter.get(
	"/categories/get",
	formController.getCategories
);

formRouter.get(
	"/tags/get",
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

export default formRouter;
