import axios from "axios";
import { useEffect, useRef } from "react";
import { Designer } from "@pdfme/ui";
import Creatable from "react-select/creatable";
import {
	Template,
	checkTemplate,
} from "@pdfme/common";

import {
	getTemplate,
	readFile,
	cloneDeep,
} from "@/utils/helpers";
import { Button } from "@/components/ui/button";
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
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

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
			axios({
				method: "post",
				url: "/create",
				data: {
					name: "template",
					categories: ["template"],
					tags: ["template"],
					schema:
						designer.current.getTemplate()
							.schemas,
					basePdf:
						designer.current.getTemplate()
							.basePdf,
					sampledata:
						designer.current.getTemplate()
							.sampledata,
					columns:
						designer.current.getTemplate()
							.columns,
				},
			});
		}
	};

	return (
		<div className="w-full">
			<div className="flex items-center space-x-4 text-sm">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Change PDF</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								Upload A PDF File
							</DialogTitle>
							<DialogDescription>
								Upload a PDF file to Create a Form
							</DialogDescription>
						</DialogHeader>
						<Input
							type="file"
							accept="application/pdf"
							onChange={onChangeBasePDF}
						/>
						<DialogFooter></DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div
				ref={designerRef}
				className="mt-5"
			/>
		</div>
	);
};
