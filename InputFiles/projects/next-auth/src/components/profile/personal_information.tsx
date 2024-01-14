"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const PersonalInfo = () => {
	const { user, accessToken } = useAuth();
	const profileSchema = z.object({
		first_name: z.string().nonempty({ message: "First name is required" }),
		last_name: z.string().nonempty({ message: "Last name is required" }),
		email: z.string().email({ message: "Invalid email address" }),
	});
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
		},
	});

	const getData = useCallback(async () => {
		try {
			const response = await axios.get("/api/auth/profile");
			if (response.status === 200) {
				setValue("first_name", response.data.appendData.first_name);
				setValue("last_name", response.data.appendData.last_name);
			}
		} catch (error: any) {
			console.log(error.response);
		}
	}, [setValue]);

	useEffect(() => {
		if (user) {
			getData();
		}
	}, [getData, user]);

	const onSubmit = async (data: z.infer<typeof profileSchema>) => {
		const respose = await axios.post("/api/auth/profile", data);
	};

	return (
		<form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				{/* Profile Photo Upload Component */}
				<div className="col-span-full flex items-center gap-x-8">
					<Image
						width={100}
						height={100}
						src={user?.image ? user?.image : "/images/default.png"}
						alt={`profile photo of ${user?.name}`}
						className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
					/>
					<div>
						<button
							type="button"
							className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						>
							Change avatar
						</button>
						<p className="mt-2 text-xs leading-5 text-gray-400">
							JPG, GIF or PNG. 1MB max.
						</p>
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						htmlFor="first-name"
						className="block text-sm font-medium leading-6 text-white"
					>
						First name
					</label>
					<div className="mt-2">
						<input
							type="text"
							id="first-name"
							{...register("first_name")}
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						{errors.first_name && (
							<p className="mt-2 text-xs leading-5 text-red-400">
								{errors.first_name.message}
							</p>
						)}
					</div>
				</div>

				<div className="sm:col-span-3">
					<label
						htmlFor="last-name"
						className="block text-sm font-medium leading-6 text-white"
					>
						Last name
					</label>
					<div className="mt-2">
						<input
							type="text"
							id="last-name"
							{...register("last_name")}
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						{errors.last_name && (
							<p className="mt-2 text-xs leading-5 text-red-400">
								{errors.last_name.message}
							</p>
						)}
					</div>
				</div>

				<div className="col-span-full">
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 text-white"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							type="email"
							{...register("email")}
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						{errors.email && (
							<p className="mt-2 text-xs leading-5 text-red-400">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div className="col-span-full">
					<label
						htmlFor="username"
						className="block text-sm font-medium leading-6 text-white"
					>
						Username
					</label>
					<div className="mt-2">
						<div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
							<span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
								example.com/
							</span>
							<input
								type="text"
								name="username"
								id="username"
								autoComplete="username"
								className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="janesmith"
							/>
						</div>
					</div>
				</div>

				<div className="col-span-full">
					<label
						htmlFor="timezone"
						className="block text-sm font-medium leading-6 text-white"
					>
						Timezone
					</label>
					<div className="mt-2">
						<select
							id="timezone"
							name="timezone"
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
						>
							<option>Pacific Standard Time</option>
							<option>Eastern Standard Time</option>
							<option>Greenwich Mean Time</option>
						</select>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<button
					type="submit"
					{...(isSubmitting && { disabled: true })}
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					{isSubmitting ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
};

export default PersonalInfo;
