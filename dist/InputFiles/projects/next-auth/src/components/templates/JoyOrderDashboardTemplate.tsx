"use client";

import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import * as React from "react";
// icons

import Header from "@/components/mui/Header";
import OrderList from "@/components/mui/OrderList";
import OrderTable from "@/components/mui/OrderTable";
import Sidebar from "@/components/mui/Sidebar";
import useScript from "@/hooks/useScript";
import BreadCrumbsTemplate from "../dashboardMui/BreadCrumbsTemplate";
import PageHeadingTemplate from "../dashboardMui/PageHeadingTemplate";

const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
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
			<Box sx={{ display: "flex", minHeight: "100dvh" }}>
				{/* Min Device Header */}
				<Header />

				<Sidebar />

				<Box
					component="main"
					className="MainContent"
					sx={{
						px: {
							xs: 2,
							md: 6,
						},
						pt: {
							xs: "calc(12px + var(--Header-height))",
							sm: "calc(12px + var(--Header-height))",
							md: 3,
						},
						pb: {
							xs: 2,
							sm: 2,
							md: 3,
						},
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minWidth: 0,
						height: "100dvh",
						gap: 1,
					}}
				>
					<BreadCrumbsTemplate />

					{/* Page Heading */}
					{/*<PageHeadingTemplate />*/}

					<OrderTable />

					{/* Order List for Mini Device */}
					<OrderList />
				</Box>
			</Box>
		</CssVarsProvider>
	);
}
