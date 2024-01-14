import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import PageViewUserUpdate from "@/services/UserManager/Views/PageViewUserUpdate";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <PageViewUserUpdate id={params.id} />
    </DashboardTemplate>
  );
}
