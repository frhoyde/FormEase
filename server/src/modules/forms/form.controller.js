import { formService } from "./form.service.js";
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

	getForm: async (req, res) => {
		try {
			const id = req.params.id;
			const form =
				await formService.getFormTemplateById(id);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	getCategories: async (req, res) => {
		try {
			const categories =
				await formService.getAllCategories();
			return res.status(200).json(categories);
		} catch (error) {
			throw new Error(error);
		}
	},

	getTags: async (req, res) => {
		try {
			const tags = await formService.getAllTags();
			return res.status(200).json(tags);
		} catch (error) {
			throw new Error(error);
		}
	},

	getForms: async (req, res) => {
		try {
			const forms =
				await formService.getAllFormTemplates();
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},

	updateForm: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const form =
				await formService.updateFormTemplateById(
					id,
					data
				);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteForm: async (req, res) => {
		try {
			const id = req.params.id;
			const form =
				await formService.deleteFormTemplateById(
					id
				);
			return res.status(200).json(form);
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteForms: async (req, res) => {
		try {
			const ids = req.body.ids;
			const forms =
				await formService.deleteFormTemplatesBulk(
					ids
				);
			return res.status(200).json(forms);
		} catch (error) {
			throw new Error(error);
		}
	},
};
