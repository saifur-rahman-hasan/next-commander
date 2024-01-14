import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import HomePage from "@/components/Page/HomePage";

export default function Home() {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <HomePage />
    </DashboardTemplate>
  );
}
