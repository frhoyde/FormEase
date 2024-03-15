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

	const onChangeMode = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value as Mode;
		setMode(value);
		localStorage.setItem("mode", value);
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
				<strong>Form, Viewer</strong>
				<span style={{ margin: "0 1rem" }}>
					:
				</span>
				<div>
					<input
						type="radio"
						onChange={onChangeMode}
						id="form"
						value="form"
						checked={mode === "form"}
					/>
					<label htmlFor="form">Form</label>
					<input
						type="radio"
						onChange={onChangeMode}
						id="viewer"
						value="viewer"
						checked={mode === "viewer"}
					/>
					<label htmlFor="viewer">Viewer</label>
				</div>
			</header>
			<div ref={uiRef} />
		</div>
	);
};
