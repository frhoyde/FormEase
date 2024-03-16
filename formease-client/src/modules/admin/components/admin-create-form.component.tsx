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
import { Label } from "@/components/ui/label";

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

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">
						Edit Profile
					</Button>
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
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label
								htmlFor="name"
								className="text-right"
							>
								Name
							</Label>
							<Input
								id="name"
								value="Pedro Duarte"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label
								htmlFor="username"
								className="text-right"
							>
								Username
							</Label>
							<Input
								id="username"
								value="@peduarte"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<div ref={designerRef} />
		</div>
	);
};
