import {
	checkTemplate,
	Template,
} from "@pdfme/common";

export const readFile = (
	file: File | null,
	type: "text" | "dataURL" | "arrayBuffer"
) => {
	return new Promise<string | ArrayBuffer>(
		(r) => {
			const fileReader = new FileReader();
			fileReader.addEventListener("load", (e) => {
				if (
					e &&
					e.target &&
					e.target.result &&
					file !== null
				) {
					r(e.target.result);
				}
			});
			if (file !== null) {
				if (type === "text") {
					fileReader.readAsText(file);
				} else if (type === "dataURL") {
					fileReader.readAsDataURL(file);
				} else if (type === "arrayBuffer") {
					fileReader.readAsArrayBuffer(file);
				}
			}
		}
	);
};

export const cloneDeep = (obj: any) =>
	JSON.parse(JSON.stringify(obj));

export const getTemplateFromJsonFile = (
	file: File
) => {
	return readFile(file, "text").then(
		(jsonStr) => {
			const template: Template = JSON.parse(
				jsonStr as string
			);
			checkTemplate(template);
			return template;
		}
	);
};

export const downloadJsonFile = (
	json: any,
	title: string
) => {
	if (typeof window !== "undefined") {
		const blob = new Blob(
			[JSON.stringify(json)],
			{
				type: "application/json",
			}
		);
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${title}.json`;
		link.click();
		URL.revokeObjectURL(url);
	}
};

export const isJsonString = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const getTemplate = () => {
	const template: Template = {
		schemas: [],
		basePdf: "",
		sampledata: [],
		columns: [],
	};
	return template;
};
