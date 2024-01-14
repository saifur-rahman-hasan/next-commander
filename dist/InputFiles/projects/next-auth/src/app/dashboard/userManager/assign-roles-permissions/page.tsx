import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import AssignRolesPermissionsPage from "@/components/Page/AssignRolesPermissionsPage";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";

const AssignRolesPermissions = () => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <AssignRolesPermissionsPage />
    </DashboardTemplate>
  );
};

export default AssignRolesPermissions;
