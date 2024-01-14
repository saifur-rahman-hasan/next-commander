import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import CreatePermission from "@/services/Authorization/Views/Permissions/PermissionCreateForm";

const CreatePermissions = () => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <CreatePermission />
    </DashboardTemplate>
  );
};

export default CreatePermissions;
