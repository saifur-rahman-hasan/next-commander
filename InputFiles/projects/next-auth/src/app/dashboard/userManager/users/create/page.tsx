import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import PageViewUserCreate from "@/services/UserManager/Views/PageViewUserCreate";

export default function Home() {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <PageViewUserCreate />
    </DashboardTemplate>
  );
}
