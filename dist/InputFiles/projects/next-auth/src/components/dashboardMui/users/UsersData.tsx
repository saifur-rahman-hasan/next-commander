"use client";

import * as React from "react";
// icons

import OrderList from "@/components/mui/OrderList";
import useScript from "@/hooks/useScript";
import BreadCrumbsTemplate from "../BreadCrumbsTemplate";
import PageHeadingTemplate from "../PageHeadingTemplate";
import UsersTable from "./UsersTable";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from "@mui/joy/CssBaseline";

const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const UsersData = () => {
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
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />

			<BreadCrumbsTemplate />

			{/* Page Heading */}
			<PageHeadingTemplate
				heading="Users"
				addText="Add User"
				addLink="/dashboard-mui/users/form"
			/>

			<UsersTable />

			{/* Order List for Mini Device */}
			<OrderList />
		</CssVarsProvider>
	);
};

export default UsersData;
