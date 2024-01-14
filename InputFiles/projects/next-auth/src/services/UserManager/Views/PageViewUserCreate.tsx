"use client";

import CondensedBreadcrumbs from "@/components/mui/CondensedBreadcrumbs";
import useAuth from "@/hooks/useAuth";
import FormUserCreate from "@/services/UserManager/Views/FormUserCreate";

export default function PageViewUserCreate() {
  const { user: authUser } = useAuth();

  return (
    <>
      <CondensedBreadcrumbs />

      <FormUserCreate />

      {/* <DataTableUsersList /> */}
    </>
  );
}
