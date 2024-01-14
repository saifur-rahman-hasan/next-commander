import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import RolesPermissionPage from "@/components/Page/RolesPermissionPage";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";

const RolesPermissions = () => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <RolesPermissionPage />
    </DashboardTemplate>
  );
};

export default RolesPermissions;
