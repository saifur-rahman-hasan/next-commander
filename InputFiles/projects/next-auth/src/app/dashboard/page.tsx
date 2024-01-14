import RedirectIfNotAuthenticated from "@/app/(website)/auth/_components/RedirectIfNotAuthenticated";
import AdminDashboardView from "@/app/dashboard/_views/AdminDashboardView";

export default function DashboardPage(){
	const isAdminUser = true
	const isBusinessUser = false
	const isUser = false

	return (
		<RedirectIfNotAuthenticated>

			{ isAdminUser && <AdminDashboardView /> }

		</RedirectIfNotAuthenticated>
	)
}