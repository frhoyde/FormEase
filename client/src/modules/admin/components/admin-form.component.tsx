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
import { generate } from "@pdfme/generator";
import Creatable from "react-select/creatable";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

type Mode = "form" | "viewer";

export const AdminFormComponent = () => {
	const uiRef = useRef<HTMLDivElement | null>(
		null
	);
	const ui = useRef<Form | Viewer | null>(null);

	const [mode, setMode] = useState<Mode>("form");

	const [tags, setTags] = useState<
		{ id: string; name: string }[]
	>([]);
	const [categories, setCategories] = useState<
		{ id: string; name: string }[]
	>([]);

	const [selectedTags, setSelectedTags] =
		useState<
			readonly { value: string; label: string }[]
		>([]);

	const [
		selectedCategories,
		setSelectedCategories,
	] = useState<
		readonly { value: string; label: string }[]
	>([]);

	const [template, setTemplate] =
		useState<Template>(getTemplate());

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

	const OnSaveAsDoc = async () => {
		if (ui.current) {
			const inputs = ui.current.getInputs();
			axios.post("/document/create", {
				inputs,
				tags: selectedTags.map(
					(tag) => tag.value
				),
				categories: selectedCategories.map(
					(category) => category.value
				),
			});
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

	useEffect(() => {
		axios
			.get("form/tag/get")
			.then((response) => {
				setTags(response.data);
			})
			.catch((error) => {
				setTags([]);
				throw error;
			});

		axios
			.get("form/category/get")
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				setCategories([]);
				throw error;
			});
	}, []);

	return (
		<div>
			<div className="flex items-center space-x-4 text-sm">
				<Switch
					id="Preview"
					onCheckedChange={(checked) => {
						setMode(checked ? "viewer" : "form");
					}}
				/>
				<Label htmlFor="Preview">Preview</Label>
				<Separator orientation="vertical" />
				<Button onClick={OnSaveAsDoc}>
					Save as Doc
				</Button>
				<Separator orientation="vertical" />
				<Button onClick={onGeneratePDF}>
					Download PDF
				</Button>
				<Separator orientation="vertical" />
				<Label>Tags</Label>
				<Creatable
					options={tags.map((tag) => ({
						value: tag.id,
						label: tag.name,
					}))}
					isClearable
					isMulti
					onChange={(e) => {
						setSelectedTags(e);
					}}
				/>
				<Separator orientation="vertical" />
				<Label>Categories</Label>
				<Creatable
					options={categories.map((category) => ({
						value: category.id,
						label: category.name,
					}))}
					isClearable
					isMulti
					onChange={(e) => {
						setSelectedCategories(e);
					}}
				/>
			</div>
			<div
				ref={uiRef}
				className="mt-5"
			/>
		</div>
	);
};
