"use client";

import useScript from "@/hooks/useScript";
import React from "react";
import Header from "../mui/Header";
import Sidebar from "../mui/Sidebar";

const useEnhancedEffect =
	typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const SidebarTemplate = () => {
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
			<Header />

			<Sidebar />
		</>
	);
};

export default SidebarTemplate;
