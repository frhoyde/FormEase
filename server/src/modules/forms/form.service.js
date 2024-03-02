export const formService = {
	createForm: (form) => {
		return { message: "Form created." };
	},
	getFormById: (id) => {
		return { message: "Form retrieved." };
	},
	updateFormById: (id, data) => {
		return { message: "Form updated." };
	},
	deleteFormById: (id) => {
		return { message: "Form deleted." };
	},
	getAllForms: () => {
		return { message: "Forms retrieved." };
	},
	deleteFormBulk: (ids) => {
		return { message: "Forms deleted." };
	},
};
