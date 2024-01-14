"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { Button, CircularProgress, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useSWR from "swr";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const CreateRolesPermissions = (props: any) => {
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data: roles, isLoading: rolesLoading } = useSWR(
    "/api/authorization/roles",
    fetcher
  );

  const { data: permissions, isLoading: permissionsLoading } = useSWR(
    "/api/authorization/permissions",
    fetcher
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_name: "",
      permission_names: "",
    },
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    setLoading(true);

    const transformedData = {
      role_id: data.role_name.value,
      permission_ids: data.permission_names.map(
        (permission: any) => permission.value
      ),
    };

    const fetchLink = "/api/authorization/role-has-permission";

    const response = await fetch(fetchLink, {
      method: "POST",
      body: JSON.stringify(transformedData),
    });
    try {
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        reset();
        props.onSubmitSuccess();
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
    setLoading(false);
  };

  const roleOptions = roles?.data.map((role: any) => ({
    value: role.id,
    label: role.name,
  }));

  const permissionOptions = permissions?.data.map((permission: any) => ({
    value: permission.id,
    label: permission.name,
  }));

  return (
    <>
      {rolesLoading && permissionsLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Card sx={{ width: 320, height: 400 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormControl>
                  <FormLabel>Role Name</FormLabel>

                  <Controller
                    control={control}
                    name="role_name"
                    rules={{
                      required: "Please select at least one role",
                    }}
                    render={({ field }) => (
                      <Select {...field} options={roleOptions} isClearable />
                    )}
                  />

                  {errors.role_name && (
                    <span className="text-red-500">This field is required</span>
                  )}

                  <FormHelperText>This is a helper text.</FormHelperText>

                  <FormLabel>Permission Name</FormLabel>

                  <Controller
                    name="permission_names"
                    control={control}
                    rules={{
                      required: "Please select at least one permission",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={permissionOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        isSearchable
                      />
                    )}
                  />

                  {errors.permission_names && (
                    <span className="text-red-500">This field is required</span>
                  )}

                  <FormHelperText>This is a helper text.</FormHelperText>
                </FormControl>
              </div>

              <div>
                <Button
                  type="submit"
                  color="success"
                  variant="outlined"
                  disabled={disabled}
                  loading={loading}
                >
                  Assign Roles To Permissions
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default CreateRolesPermissions;
