import {
	useEffect,
	useRef,
	useState,
} from "react";
import { Form, Viewer } from "@pdfme/ui";
import { Template } from "@pdfme/common";
import { checkTemplate } from "@pdfme/common";
import { getTemplate } from "@/utils/helpers";

type Mode = "form" | "viewer";

export const AdminFormComponent = () => {
	const uiRef = useRef<HTMLDivElement | null>(
		null
	);
	const ui = useRef<Form | Viewer | null>(null);

	const [mode, setMode] = useState<Mode>(
		(localStorage.getItem("mode") as Mode) ??
			"form"
	);

	const onGeneratePDF = async () => {
		if (ui.current) {
			const template = ui.current.getTemplate();
			const inputs = ui.current.getInputs();
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
	useEffect(() => {
		if (uiRef.current) {
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

			ui.current = new (
				mode === "form" ? Form : Viewer
			)({
				domContainer: uiRef.current,
				template,
				inputs: template.sampledata ?? [{}],
			});
		}
		return () => {
			if (ui.current) {
				ui.current.destroy();
			}
		};
	}, [uiRef, mode]);

	return (
		<div>
			<div ref={uiRef} />
		</div>
	);
};
