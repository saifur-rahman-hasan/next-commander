"use client";

import AssignRolesPermissionsPage from "@/components/Page/AssignRolesPermissionsPage";
import RolesPermissionPage from "@/components/Page/RolesPermissionPage";
import CondensedBreadcrumbs from "@/components/mui/CondensedBreadcrumbs";
import useAuth from "@/hooks/useAuth";
import FormUserUpdate from "./FormUserUpdate";

export default function PageViewUserUpdate({ id }: { id: string }) {
  const { user: authUser } = useAuth();

  return (
    <>
      <CondensedBreadcrumbs />
      <FormUserUpdate id={id} />
      <RolesPermissionPage />
      <AssignRolesPermissionsPage />
    </>
  );
}
