export const formController = {
	createForm: async (req, res) => {
		try {
			const data = req.body;
			const form =
				await formService.createFormTemplate(
					data
				);
			return res.status(201).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	getForm: (req, res) => {
		try {
			const id = req.params.id;
			const form =
				formService.getFormTemplateById(id);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	getCategries: (req, res) => {
		try {
			const categories =
				formService.getAllCategories();
			return res.status(200).json(categories);
		} catch (error) {
			throw new Error(error);
		}
	},

	getTags: (req, res) => {
		try {
			const tags = formService.getAllTags();
			return res.status(200).json(tags);
		} catch (error) {
			throw new Error(error);
		}
	},

	getForms: (req, res) => {
		try {
			const forms =
				formService.getAllFormTemplates();
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},

	updateForm: (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const form =
				formService.updateFormTemplateById(
					id,
					data
				);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteForm: (req, res) => {
		try {
			const id = req.params.id;
			const form =
				formService.deleteFormTemplateById(id);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteForms: (req, res) => {
		try {
			const ids = req.body.ids;
			const forms =
				formService.deleteFormTemplatesBulk(ids);
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},
};
