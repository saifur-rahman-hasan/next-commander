import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import PageViewUsersList from "@/services/UserManager/Views/PageViewUsersList";

export default function Home() {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <PageViewUsersList />
    </DashboardTemplate>
  );
}
