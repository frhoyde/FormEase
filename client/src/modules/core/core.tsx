import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { AdminFormPage } from "../admin/pages/admin-form.page";
import { AdminCreateFormPage } from "../admin/pages/admin-create-form.page";
import { DocumentsPage } from "../documents/pages/documents.page";
import { Separator } from "@/components/ui/separator";

export const Core = () => {
	return (
		<Tabs
			defaultValue="account"
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="account">
					Form
				</TabsTrigger>
				<TabsTrigger value="password">
					Form Designer
				</TabsTrigger>
				<TabsTrigger value="documents">
					Documents
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<Card>
					<CardHeader></CardHeader>
					<CardContent className="space-y-2">
						<AdminFormPage />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="password">
				<Card>
					<CardHeader></CardHeader>
					<CardContent className="space-y-2">
						<AdminCreateFormPage />
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="documents">
				<Card>
					<CardHeader>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<DocumentsPage />
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
};
