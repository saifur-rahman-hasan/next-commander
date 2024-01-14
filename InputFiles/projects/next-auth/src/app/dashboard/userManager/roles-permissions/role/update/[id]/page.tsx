import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import UpdateRole from "@/services/Authorization/Views/Roles/RoleUpdateForm";

const UpdateRoles = ({ params }: { params: { id: string } }) => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <UpdateRole id={params.id} />
    </DashboardTemplate>
  );
};

export default UpdateRoles;
