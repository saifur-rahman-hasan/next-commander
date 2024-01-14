"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { useGetUsersQuery } from "@/services/UserManager/Store/UserManagerApiSlice";
import { debugLog } from "@/utils/helperFunctions";
import { Button, CircularProgress, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { ModelType } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useSWR from "swr";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const CreateAssignRole = (props: any) => {
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
    data: usersListsData,
    isLoading: usersListDataIsLoading,
    isFetching: usersListDataIsFetching,
  } = useGetUsersQuery(null);

  const { data: roles, isLoading: rolesLoading } = useSWR(
    "/api/authorization/roles",
    fetcher
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: "",
      role_names: "",
    },
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    setLoading(true);

    const transformedData = {
      model_id: data.user_name.value,
      model_type: ModelType.USER,
      role_ids: data.role_names.map((role: any) => role.value),
    };

    const fetchLink = "/api/authorization/model-has-role";

    const response = await fetch(fetchLink, {
      method: "POST",
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

  const userOptions = usersListsData?.data.map((user: any) => ({
    value: user.id,
    label: user.email,
  }));

  const roleOptions = roles?.data.map((role: any) => ({
    value: role.id,
    label: role.name,
  }));

  return (
    <>
      {(usersListDataIsLoading && rolesLoading) || usersListDataIsFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Card sx={{ width: 320, height: 400 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormControl>
                  <FormLabel>User Email</FormLabel>

                  <Controller
                    control={control}
                    name="user_name"
                    rules={{
                      required: "Please select at least one role",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={userOptions}
                        isClearable
                        isSearchable
                      />
                    )}
                  />

                  {errors.user_name && (
                    <span className="text-red-500">This field is required</span>
                  )}

                  <FormHelperText>This is a helper text.</FormHelperText>

                  <FormLabel>Role Names</FormLabel>

                  <Controller
                    name="role_names"
                    control={control}
                    rules={{
                      required: "Please select at least one role",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={roleOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        isSearchable
                      />
                    )}
                  />

                  {errors.role_names && (
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
                  Assign Roles To Users
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default CreateAssignRole;
