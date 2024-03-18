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
		schemas: [
			{
				age: {
					type: "text",
					position: { x: 48.7, y: 84.47 },
					width: 43.38,
					height: 6.12,
					fontSize: 12,
				},
				sex: {
					type: "text",
					position: { x: 48.7, y: 91.25 },
					width: 43.38,
					height: 6.12,
					fontSize: 12,
				},
				weight: {
					type: "text",
					position: { x: 49, y: 98.01 },
					width: 43.38,
					height: 6.12,
					fontSize: 12,
				},
				breed: {
					type: "text",
					position: { x: 49, y: 104.1 },
					width: 43.38,
					height: 6.12,
					fontSize: 12,
				},
			},
		],
		basePdf:
			"data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UaXRsZSAoVW50aXRsZWQgZG9jdW1lbnQpCi9Qcm9kdWNlciAoU2tpYS9QREYgbTEyNCBHb29nbGUgRG9jcyBSZW5kZXJlcik+PgplbmRvYmoKMyAwIG9iago8PC9jYSAxCi9CTSAvTm9ybWFsPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDg0Pj4gc3RyZWFtCjEgMCAwIC0xIDAgODQyIGNtCnEKLjc1IDAgMCAuNzUgMCAwIGNtCjEgMSAxIFJHIDEgMSAxIHJnCi9HMyBncwowIDAgNzk0IDExMjMgcmUKZgpRCgplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZSAvUGFnZQovUmVzb3VyY2VzIDw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9FeHRHU3RhdGUgPDwvRzMgMyAwIFI+Pj4+Ci9NZWRpYUJveCBbMCAwIDU5NiA4NDJdCi9Db250ZW50cyA0IDAgUgovU3RydWN0UGFyZW50cyAwCi9QYXJlbnQgNSAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbMiAwIFJdPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZwovUGFnZXMgNSAwIFIKL1ZpZXdlclByZWZlcmVuY2VzIDw8L1R5cGUgL1ZpZXdlclByZWZlcmVuY2VzCi9EaXNwbGF5RG9jVGl0bGUgdHJ1ZT4+Pj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMjc3IDAwMDAwIG4gCjAwMDAwMDAxMDggMDAwMDAgbiAKMDAwMDAwMDE0NSAwMDAwMCBuIAowMDAwMDAwNDY1IDAwMDAwIG4gCjAwMDAwMDA1MjAgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDcKL1Jvb3QgNiAwIFIKL0luZm8gMSAwIFI+PgpzdGFydHhyZWYKNjM3CiUlRU9GCg==",
		sampledata: [
			{
				age: "Enter Age",
				sex: "Enter Gender",
				weight: "Enter Weight",
				breed: "Enter Name",
			},
		],
		columns: ["age", "sex", "weight", "breed"],
	};
	return template;
};
