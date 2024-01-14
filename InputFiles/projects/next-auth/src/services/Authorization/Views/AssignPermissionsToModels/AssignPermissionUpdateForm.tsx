"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { debugLog } from "@/utils/helperFunctions";
import { Button, CircularProgress, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useSWR from "swr";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const UpdateAssignPermission = (props: any) => {
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

  const {
    data: modelHasPermissionsData,
    isLoading: modelHasPermissionsLoading,
  } = useSWR(`/api/authorization/model-has-permission`, fetcher);

  const { data: permissions, isLoading: permissionsLoading } = useSWR(
    "/api/authorization/permissions",
    fetcher
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      permission_names: [],
    },
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    setLoading(true);

    const transformedData = {
      model_id: props.model_id,
      permission_ids: data.permission_names.map(
        (permission: any) => permission.value
      ),
    };

    const fetchLink = "/api/authorization/model-has-permission";

    const response = await fetch(fetchLink, {
      method: "PUT",
      body: JSON.stringify(transformedData),
    });
    try {
      const responseData = await response.json();
      if (response.ok) {
        debugLog("responseData", responseData);
        reset();
        props.onSubmitSuccess();
      } else {
        debugLog("responseData", responseData);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
    setLoading(false);
  };

  const defaultValues = {
    permission_names: modelHasPermissionsData?.data
      .filter(
        (modelHasPermission: any) =>
          modelHasPermission.model_id === props.model_id
      )
      .map((modelHasPermission: any) =>
        modelHasPermission.permission_ids.map(
          (permission_id: any, index: number) => ({
            label: modelHasPermission.permission_names[index],
            value: permission_id,
          })
        )
      )
      .flat(), // Flatten the array of arrays into a single array
  };

  React.useEffect(() => {
    if (defaultValues.permission_names) {
      setValue("permission_names", defaultValues.permission_names);
    }
  }, []);

  const permissionOptions = permissions?.data.map((permission: any) => ({
    value: permission.id,
    label: permission.name,
  }));

  return (
    <>
      {modelHasPermissionsLoading && permissionsLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Card sx={{ width: 320, height: 400 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormControl>
                  <FormLabel>
                    Assign Permision For: <strong>{props.model_email}</strong>
                  </FormLabel>

                  <FormLabel>Permission Names</FormLabel>

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
                        defaultValue={defaultValues.permission_names}
                        closeMenuOnSelect={false}
                        isSearchable
                      />
                    )}
                  />

                  {errors.permission_names && (
                    <span className="text-red-500">
                      {errors.permission_names.message?.toString()}
                    </span>
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
                  Update
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default UpdateAssignPermission;
