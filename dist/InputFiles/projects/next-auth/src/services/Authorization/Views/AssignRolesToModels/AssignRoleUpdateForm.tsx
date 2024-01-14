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

const UpdateAssignRole = (props: any) => {
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

  const { data: modelHasRolesData, isLoading: modelHasRolesLoading } = useSWR(
    `/api/authorization/model-has-role`,
    fetcher
  );

  const { data: roles, isLoading: rolesLoading } = useSWR(
    "/api/authorization/roles",
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
      role_names: [],
    },
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    setLoading(true);

    const transformedData = {
      model_id: props.model_id,
      role_ids: data.role_names.map((role: any) => role.value),
    };

    const fetchLink = "/api/authorization/model-has-role";

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
    role_names: modelHasRolesData?.data
      .filter((modelHasRole: any) => modelHasRole.model_id === props.model_id)
      .map((modelHasRole: any) =>
        modelHasRole.role_ids.map((role_id: any, index: number) => ({
          label: modelHasRole.role_names[index],
          value: role_id,
        }))
      )
      .flat(), // Flatten the array of arrays into a single array
  };

  React.useEffect(() => {
    if (defaultValues.role_names) {
      setValue("role_names", defaultValues.role_names);
    }
  }, []);

  const roleOptions = roles?.data.map((role: any) => ({
    value: role.id,
    label: role.name,
  }));

  return (
    <>
      {modelHasRolesLoading && rolesLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Card sx={{ width: 320, height: 400 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormControl>
                  <FormLabel>
                    Assign Role For: <strong>{props.model_email}</strong>
                  </FormLabel>

                  <FormLabel>Role Names</FormLabel>

                  <Controller
                    name="role_names"
                    control={control}
                    rules={{
                      required: "Please select at least one permission",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={roleOptions}
                        isMulti
                        defaultValue={defaultValues.role_names}
                        closeMenuOnSelect={false}
                        isSearchable
                      />
                    )}
                  />

                  {errors.role_names && (
                    <span className="text-red-500">
                      {errors.role_names.message?.toString()}
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

export default UpdateAssignRole;
