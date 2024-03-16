import { useEffect, useRef } from "react";
import { Designer } from "@pdfme/ui";
import {
	Template,
	checkTemplate,
} from "@pdfme/common";

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
			// make api call to db
		}
	};

	return (
		<div>
			<header className="w-screen flex justify-end p-4 bg-black shadow-md">
				<label>
					Change PDF
					<input
						type="file"
						accept="application/pdf"
						onChange={onChangeBasePDF}
					/>
				</label>
			</header>
			<div ref={designerRef} />
		</div>
	);
};