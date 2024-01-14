"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { zodResolver } from "@hookform/resolvers/zod";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import { Button, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BreadCrumbsTemplate from "../../BreadCrumbsTemplate";
import PageHeadingTemplate from "../../PageHeadingTemplate";
const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const RoleFormData = () => {
	const [disabled, setDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [message, setMessage] = React.useState("");

	const status = useScript(`https://unpkg.com/feather-icons`);

	useEnhancedEffect(() => {
		// Feather icon setup: https://github.com/feathericons/feather#4-replace
		// @ts-ignore
		if (typeof feather !== "undefined") {
			// @ts-ignore
			feather.replace();
		}
	}, [status]);

	const router = useRouter();

	const searchParams = useSearchParams();

	const id = searchParams.get("id");

	const schema = z.object({
		name: z.string().min(3).max(255),
	});

	const {
		handleSubmit,
		reset,
		register,
		setValue,
		formState: { errors },
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
		},
	});

	const fetchRole = async (id: string) => {
		const response = await fetch(`/api/authorization/role/${id}`, {
			method: "GET",
		});
		try {
			const responseData = await response.json();
			if (response.ok) {
				console.log(responseData);
				setValue("name", responseData.data.name);
			} else {
				console.log(responseData.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (id) {
		React.useEffect(() => {
			fetchRole(id);
		}, [id]);
	}

	const onSubmit = async (data: z.infer<typeof schema>) => {
		setDisabled(true);
		setLoading(true);

		const fetchLink = id
			? `/api/authorization/role/${id}`
			: "/api/authorization/role";
		const methodType = id ? "PUT" : "POST";

		const response = await fetch(fetchLink, {
			method: methodType,
			body: JSON.stringify(data),
		});
		try {
			const responseData = await response.json();
			if (response.ok) {
				setMessage(responseData.message);
				console.log(responseData.message);
				reset();
				router.push("/dashboard-mui/roles");
			} else {
				setMessage(responseData.message);
			}
		} catch (error) {
			console.log(error);
		}
		setDisabled(false);
		setLoading(false);
	};

	return (
		<>
			<BreadCrumbsTemplate />

			{/* Page Heading */}
			<PageHeadingTemplate heading="Role Form" />
			<Card sx={{ width: 320 }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p>{message}</p>
					<div>
						<FormControl>
							<FormLabel>Role Name</FormLabel>
							<Input
								startDecorator={<SwipeRightAltIcon />}
								type="text"
								{...register("name")}
								placeholder="Role Name"
							/>
							<FormHelperText>This is a helper text.</FormHelperText>
						</FormControl>
					</div>
					<div>
						<Button
							type="submit"
							color="success"
							variant="outlined"
							disabled={disabled}
							loading={loading}
						>
							Create Role
						</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default RoleFormData;
