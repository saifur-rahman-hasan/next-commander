"use client";

import * as React from "react";
// icons

import OrderList from "@/components/mui/OrderList";
import useScript from "@/hooks/useScript";
import BreadCrumbsTemplate from "../BreadCrumbsTemplate";
import PageHeadingTemplate from "../PageHeadingTemplate";
import ServiceAccountTable from "./ServiceAccountTable";

const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const ServiceAccountData = () => {
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
			<PageHeadingTemplate heading="Service Account" />

			<ServiceAccountTable />

			{/* Order List for Mini Device */}
			<OrderList />
		</>
	);
};

export default ServiceAccountData;
