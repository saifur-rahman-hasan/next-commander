"use client"

import CondensedBreadcrumbs from "@/components/mui/CondensedBreadcrumbs";
import DataTableUsersList from "@/services/UserManager/Views/DataTableUsersList";
import useAuth from "@/hooks/useAuth";

export default function PageViewUsersList() {
	const {
		user: authUser
	} = useAuth()

	return (
		<>

			<CondensedBreadcrumbs />

			<DataTableUsersList />

		</>
	)
}