import {
	useEffect,
	useRef,
	useState,
} from "react";
import { Form, Viewer } from "@pdfme/ui";
import { Template } from "@pdfme/common";
import { checkTemplate } from "@pdfme/common";
import { getTemplate } from "@/utils/helpers";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { generate } from "@pdfme/generator";

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
			<div className="flex items-center space-x-4 text-sm">
				<Toggle aria-label="Toggle">
					Preview
				</Toggle>
				<Separator orientation="vertical" />
				<Button>Save as Doc</Button>
				<Separator orientation="vertical" />
				<Button onClick={onGeneratePDF}>
					Download PDF
				</Button>
			</div>
			<div
				ref={uiRef}
				className="mt-5"
			/>
		</div>
	);
};
