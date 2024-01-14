"use client";

import CreatePermission from "@/services/Authorization/Views/Permissions/PermissionCreateForm";
import PermissionsTable from "@/services/Authorization/Views/Permissions/PermissionsTable";
import CreateRole from "@/services/Authorization/Views/Roles/RoleCreateForm";
import RolesTable from "@/services/Authorization/Views/Roles/RolesTable";
import { useState } from "react";
import Modal from "../common/Modal";
import DynamicTabs from "../common/Tabs";

const RolesPermissionPage = () => {
  const [openRole, setOpenRole] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [isRoleFormSubmitted, setIsRoleFormSubmitted] = useState(false);
  const [isPermissionFormSubmitted, setIsPermissionFormSubmitted] =
    useState(false);

  const handleRoleFormSubmitSuccess = () => {
    setIsRoleFormSubmitted(true); // Close the modal
    setOpenRole(false);
    // You can perform any necessary UI updates here, like refreshing the list of roles.
  };

  const handlePermissionsFormSubmitSuccess = () => {
    setIsPermissionFormSubmitted(true); // Close the modal
    setOpenPermission(false);
    // You can perform any necessary UI updates here, like refreshing the list of roles.
  };

  const tabsContent = [
    {
      label: "Roles",
      content: (
        <>
          <Modal open={openRole} setOpen={setOpenRole}>
            <CreateRole onSubmitSuccess={handleRoleFormSubmitSuccess} />
          </Modal>
          <button
            className="bg-black text-white inline-block px-4 py-2 rounded-md"
            onClick={() => setOpenRole(true)}
          >
            Create Role
          </button>
          <RolesTable
            isFormSubmitted={isRoleFormSubmitted}
            resetFormSubmissionStatus={() => setIsRoleFormSubmitted(false)}
          />
        </>
      ),
    },
    {
      label: "Permissions",
      content: (
        <>
          <Modal open={openPermission} setOpen={setOpenPermission}>
            <CreatePermission
              onSubmitSuccess={handlePermissionsFormSubmitSuccess}
            />
          </Modal>
          <button
            className="bg-black text-white inline-block px-4 py-2 rounded-md"
            onClick={() => setOpenPermission(true)}
          >
            Create Permission
          </button>
          <PermissionsTable
            isFormSubmitted={isPermissionFormSubmitted}
            resetFormSubmissionStatus={() =>
              setIsPermissionFormSubmitted(false)
            }
          />
        </>
      ),
    },
  ];
  return <DynamicTabs tabs={tabsContent} />;
};

export default RolesPermissionPage;
