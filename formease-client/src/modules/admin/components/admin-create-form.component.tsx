import { useEffect, useRef } from "react";
import { Designer } from "@pdfme/ui";
import {
	Template,
	checkTemplate,
} from "@pdfme/common";

import { generate } from "@pdfme/generator";
import {
	getTemplate,
	readFile,
	cloneDeep,
} from "@/utils/helpers";

export const AdminCreateFormComponent = () => {
	const designerRef =
		useRef<HTMLDivElement | null>(null);
	const designer = useRef<Designer | null>(null);

	useEffect(() => {
		if (designerRef.current) {
			let template: Template = getTemplate();
			try {
				const templateString =
					localStorage.getItem("template");
				const templateJson = templateString
					? JSON.parse(templateString)
					: getTemplate();
				checkTemplate(templateJson);
				template = templateJson as Template;
			} catch {
				localStorage.removeItem("template");
			}

			designer.current = new Designer({
				domContainer: designerRef.current,
				template,
			});
			designer.current.onSaveTemplate(
				onSaveTemplate
			);
		}
		return () => {
			if (designer.current) {
				designer.current.destroy();
			}
		};
	}, [designerRef]);

	const onChangeBasePDF = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log("askldj");
		if (e.target && e.target.files) {
			readFile(e.target.files[0], "dataURL").then(
				async (basePdf) => {
					if (designer.current) {
						designer.current.updateTemplate(
							Object.assign(
								cloneDeep(
									designer.current.getTemplate()
								),
								{
									basePdf,
								}
							)
						);
					}
				}
			);
		}
	};

	const onSaveTemplate = (
		template?: Template
	) => {
		if (designer.current) {
			localStorage.setItem(
				"template",
				JSON.stringify(
					template ||
						designer.current.getTemplate()
				)
			);
			alert("Saved!");
		}
	};

	const onGeneratePDF = async () => {
		if (designer.current) {
			const template =
				designer.current.getTemplate();
			const inputs = template.sampledata ?? [];
			const pdf = await generate({
				template,
				inputs,
			});
			const blob = new Blob([pdf.buffer], {
				type: "application/pdf",
			});
			window.open(URL.createObjectURL(blob));
		}
	};

	return (
		<div>
			<header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<label style={{ width: 180 }}>
					Change PDF
					<input
						type="file"
						accept="application/pdf"
						onChange={onChangeBasePDF}
					/>
				</label>
				<button onClick={onGeneratePDF}>
					Generate PDF
				</button>
			</header>
			<div ref={designerRef} />
		</div>
	);
};
