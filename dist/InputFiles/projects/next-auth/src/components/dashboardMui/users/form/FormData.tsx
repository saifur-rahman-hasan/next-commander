"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { zodResolver } from "@hookform/resolvers/zod";
import Key from "@mui/icons-material/Key";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { Button, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BreadCrumbsTemplate from "../../BreadCrumbsTemplate";
import PageHeadingTemplate from "../../PageHeadingTemplate";
const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const UserFormData = () => {
	const [passValue, setPassValue] = React.useState("");
	const [disabled, setDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const minLength = 6;

	const searchParams = useSearchParams();

	const id = searchParams.get("id");

	const router = useRouter();

	const schema = z.object({
		name: z.string().nonempty("Name is required"),
		email: z.string().email("Invalid email").nonempty("Email is required"),
		password: z
			.string()
			.min(minLength, "Password must be at least 6 characters"),
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
			email: "",
			password: "",
		},
	});

	const fetchUser = async (id: string) => {
		const response = await fetch(`/api/userList/${id}`, {
			method: "GET",
		});
		try {
			const responseData = await response.json();
			if (response.ok) {
				console.log(responseData);
				setValue("name", responseData.data.name);
				setValue("email", responseData.data.email);
			} else {
				console.log(responseData.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (id) {
		React.useEffect(() => {
			fetchUser(id);
		}, [id]);
	}

	const onSubmit = async (data: z.infer<typeof schema>) => {
		setDisabled(true);
		setLoading(true);

		const fetchLink = id ? `/api/userList/${id}` : "/api/userList";
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
				router.push("/dashboard-mui/users");
			} else {
				setMessage(responseData.message);
			}
		} catch (error) {
			console.log(error);
		}
		setDisabled(false);
		setLoading(false);
	};

	const status = useScript(`https://unpkg.com/feather-icons`);

	useEnhancedEffect(() => {
		// Feather icon setup: https://github.com/feathericons/feather#4-replace
		// @ts-ignore
		if (typeof feather !== "undefined") {
			// @ts-ignore
			feather.replace();
		}
	}, [status]);

	return (
		<>
			<BreadCrumbsTemplate />

			{/* Page Heading */}
			<PageHeadingTemplate heading="User Form" />
			<Card sx={{ width: 320 }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p>{message}</p>
					<div>
						<FormControl>
							<FormLabel>Full Name</FormLabel>
							<Input
								startDecorator={<PersonIcon />}
								type="text"
								placeholder="Name"
								{...register("name")}
							/>
							<FormHelperText>
								{errors.name && (
									<p className="text-red-500">
										{errors?.name?.message?.toString()}
									</p>
								)}
							</FormHelperText>
						</FormControl>
					</div>
					<div>
						<FormControl>
							<FormLabel>Your Email</FormLabel>
							<Input
								startDecorator={<MailIcon />}
								type="email"
								{...register("email")}
								placeholder="example@email.com"
							/>
							<FormHelperText>
								{errors.email && (
									<p className="text-red-500">
										{errors?.email?.message?.toString()}
									</p>
								)}
							</FormHelperText>
						</FormControl>
					</div>
					<div>
						<FormControl>
							<FormLabel>Your Password</FormLabel>

							<Stack
								spacing={0.5}
								sx={{
									"--hue": Math.min(passValue.length * 10, 120),
								}}
							>
								<Input
									type="password"
									placeholder="Type in here…"
									startDecorator={<Key />}
									{...register("password")}
								/>
								<LinearProgress
									determinate
									size="sm"
									value={Math.min((passValue.length * 100) / minLength, 100)}
									sx={{
										bgcolor: "background.level3",
										color: "hsl(var(--hue) 80% 40%)",
									}}
								/>
								<Typography
									level="body-xs"
									sx={{
										alignSelf: "flex-end",
										color: "hsl(var(--hue) 80% 30%)",
									}}
								>
									{passValue.length < 3 && "Very weak"}
									{passValue.length >= 3 && passValue.length < 6 && "Weak"}
									{passValue.length >= 6 && passValue.length < 10 && "Strong"}
									{passValue.length >= 10 && "Very strong"}
								</Typography>
							</Stack>
							<FormHelperText>
								{errors.password && (
									<p className="text-red-500">
										{errors?.password?.message?.toString()}
									</p>
								)}
							</FormHelperText>
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
							Create User
						</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default UserFormData;
