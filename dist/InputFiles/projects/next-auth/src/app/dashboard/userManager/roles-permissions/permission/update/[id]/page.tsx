import DashboardDefaultSidebar from "@/components/DashboardUI/DashboardDefaultSidebar";
import DashboardTemplate from "@/components/dashboardMui/DashboardTemplate";
import UpdatePermission from "@/services/Authorization/Views/Permissions/PermissionUpdateForm";

const UpdatePermissions = ({ params }: { params: { id: string } }) => {
  return (
    <DashboardTemplate sidebar={<DashboardDefaultSidebar />}>
      <UpdatePermission id={params.id} />
    </DashboardTemplate>
  );
};

export default UpdatePermissions;
