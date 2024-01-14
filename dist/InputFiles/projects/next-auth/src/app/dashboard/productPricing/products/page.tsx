import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import ProductListPage from "@/services/products/Views/ProductListPage";

export default function ProductPage() {
	return (
		<DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
			<ProductListPage />
		</DashboardTemplate>
	)
}