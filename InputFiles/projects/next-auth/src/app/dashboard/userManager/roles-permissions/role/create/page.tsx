import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import CreateRole from "@/services/Authorization/Views/Roles/RoleCreateForm";

const CreateRoles = () => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <CreateRole />
    </DashboardTemplate>
  );
};

export default CreateRoles;
