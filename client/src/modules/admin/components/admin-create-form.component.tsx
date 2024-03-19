import axios from "axios";
import {
	useEffect,
	useRef,
	useState,
} from "react";
import { text, image } from "@pdfme/schemas";
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
	getPlugins,
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
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export const AdminCreateFormComponent = () => {
	const designerRef =
		useRef<HTMLDivElement | null>(null);
	const designer = useRef<Designer | null>(null);

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

	const [name, setName] = useState<string>("");
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
				plugins: getPlugins(),
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

	const onSaveTemplate = () => {
		if (designer.current) {
			axios({
				method: "post",
				url: "form/create",
				data: {
					name: name,
					categories: selectedCategories.map(
						(category) => {
							id: category.value;
							name: category.label;
						}
					),
					tags: selectedTags,
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
		<div className="w-full">
			<div className="flex items-center space-x-4 text-sm">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					className="w-50"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
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
				<Separator orientation="vertical" />
				<Button onClick={onSaveTemplate}>
					Save Template
				</Button>
			</div>
			<div
				ref={designerRef}
				className="mt-5"
			/>
		</div>
	);
};
