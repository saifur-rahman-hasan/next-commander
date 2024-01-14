"use client";

import * as React from "react";
// icons

import OrderList from "@/components/mui/OrderList";
import useScript from "@/hooks/useScript";
import BreadCrumbsTemplate from "../BreadCrumbsTemplate";
import PageHeadingTemplate from "../PageHeadingTemplate";
import PermissionsTable from "./PermissionTable";

const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const PermissionsData = () => {
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
			<PageHeadingTemplate
				heading="Permissions"
				addText="Add Permission"
				addLink="/dashboard-mui/permissions/form"
			/>

			<PermissionsTable />

			{/* Order List for Mini Device */}
			<OrderList />
		</>
	);
};

export default PermissionsData;
