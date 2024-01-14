"use client";

import CreateAssignPermission from "@/services/Authorization/Views/AssignPermissionsToModels/AssignPermissionCreateForm";
import AssignPermissionTable from "@/services/Authorization/Views/AssignPermissionsToModels/AssignPermissionTable";
import CreateRolesPermissions from "@/services/Authorization/Views/AssignPermissionsToRoles/AssignRolesPermissionsCreateForm";
import AssignRolesPermissionsTable from "@/services/Authorization/Views/AssignPermissionsToRoles/AssignRolesPermissionsTable";
import CreateAssignRole from "@/services/Authorization/Views/AssignRolesToModels/AssignRoleCreateForm";
import AssignRoleTable from "@/services/Authorization/Views/AssignRolesToModels/AssignRoleTable";
import { useState } from "react";
import Modal from "../common/Modal";
import DynamicTabs from "../common/Tabs";

const AssignRolesPermissionsPage = () => {
  const [openRolesPermissions, setOpenRolesPermissions] = useState(false);
  const [openAssignRole, setOpenAssignRole] = useState(false);
  const [openAssignPermission, setOpenAssignPermission] = useState(false);
  const [isRolesPermissionsFormSubmitted, setIsRolesPermissionsFormSubmitted] =
    useState(false);
  const [isAssignRoleFormSubmitted, setIsAssignRoleFormSubmitted] =
    useState(false);
  const [isAssignPermissionFormSubmitted, setIsAssignPermissionFormSubmitted] =
    useState(false);

  const handleRolesPermissionsFormSubmitSuccess = () => {
    setIsRolesPermissionsFormSubmitted(true); // Close the modal
    setOpenRolesPermissions(false);
    // You can perform any necessary UI updates here, like refreshing the list of roles.
  };

  const handleAssignRoleFormSubmitSuccess = () => {
    setIsAssignRoleFormSubmitted(true); // Close the modal
    setOpenAssignRole(false);
    // You can perform any necessary UI updates here, like refreshing the list of roles.
  };
  const handleAssignPermissionFormSubmitSuccess = () => {
    setIsAssignPermissionFormSubmitted(true); // Close the modal
    setOpenAssignPermission(false);
    // You can perform any necessary UI updates here, like refreshing the list of roles.
  };

  const tabsContent = [
    {
      label: "Role To Permissions",
      content: (
        <>
          <Modal open={openRolesPermissions} setOpen={setOpenRolesPermissions}>
            <CreateRolesPermissions
              onSubmitSuccess={handleRolesPermissionsFormSubmitSuccess}
            />
          </Modal>
          <button
            className="bg-black text-white inline-block px-4 py-2 rounded-md"
            onClick={() => setOpenRolesPermissions(true)}
          >
            Assign Roles To Permissions
          </button>
          <AssignRolesPermissionsTable
            isFormSubmitted={isRolesPermissionsFormSubmitted}
            resetFormSubmissionStatus={() =>
              setIsRolesPermissionsFormSubmitted(false)
            }
          />
        </>
      ),
    },
    {
      label: "Assign Role",
      content: (
        <>
          <Modal open={openAssignRole} setOpen={setOpenAssignRole}>
            <CreateAssignRole
              onSubmitSuccess={handleAssignRoleFormSubmitSuccess}
            />
          </Modal>
          <button
            className="bg-black text-white inline-block px-4 py-2 rounded-md"
            onClick={() => setOpenAssignRole(true)}
          >
            Assign Roles To Users
          </button>
          <AssignRoleTable
            isFormSubmitted={isAssignRoleFormSubmitted}
            resetFormSubmissionStatus={() =>
              setIsRolesPermissionsFormSubmitted(false)
            }
          />
        </>
      ),
    },
    {
      label: "Assign Permission",
      content: (
        <>
          <Modal open={openAssignPermission} setOpen={setOpenAssignPermission}>
            <CreateAssignPermission
              onSubmitSuccess={handleAssignPermissionFormSubmitSuccess}
            />
          </Modal>
          <button
            className="bg-black text-white inline-block px-4 py-2 rounded-md"
            onClick={() => setOpenAssignPermission(true)}
          >
            Assign Permissions To Users
          </button>
          <AssignPermissionTable
            isFormSubmitted={isAssignPermissionFormSubmitted}
            resetFormSubmissionStatus={() =>
              setIsAssignPermissionFormSubmitted(false)
            }
          />
        </>
      ),
    },
  ];

  return <DynamicTabs tabs={tabsContent} />;
};

export default AssignRolesPermissionsPage;
