import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import SidebarTemplate from "@/components/dashboardMui/SidebarTemplate";

export default function AdminDashboardLayout({
	children,   
}: {
	children: React.ReactNode;
}) {
	return (
		<DashboardTemplate
			sidebar={<SidebarTemplate />}
		>
			{children}
		</DashboardTemplate>
	);
}
