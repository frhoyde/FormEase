export const formController = {
	createForm: async (req, res) => {
		try {
			const data = req.body;
			const form =
				await formService.createForm(data);
			return res.status(201).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	getForm: (req, res) => {
		try {
			const id = req.params.id;
			const form = formService.getFormById(id);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	getForms: (req, res) => {
		try {
			const forms = formService.getAllForms();
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},

	updateForm: (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const form = formService.updateFormById(
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
			const form = formService.deleteFormById(id);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteForms: (req, res) => {
		try {
			const ids = req.body.ids;
			const forms =
				formService.deleteFormBulk(ids);
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},
};
