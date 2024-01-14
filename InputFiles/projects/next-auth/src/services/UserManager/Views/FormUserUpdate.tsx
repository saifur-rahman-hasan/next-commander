"use client";

import * as React from "react";
// icons

import PageHeadingTemplate from "@/components/dashboardMui/PageHeadingTemplate";
import useScript from "@/hooks/useScript";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/services/UserManager/Store/UserManagerApiSlice";
import { debugLog } from "@/utils/helperFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import Key from "@mui/icons-material/Key";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { Button, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Role {
  id: string;
  name: string;
}

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const FormUserUpdate = ({ id }: { id: string }) => {
  const [passValue, setPassValue] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [roleId, setRoleId] = React.useState<string[]>([]);
  const minLength = 6;

  const {
    data: user,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUserByIdQuery(id);

  const [
    updateUser,
    {
      isLoading: userUpdateIsLoading,
      isSuccess: userUpdateIsSuccess,
      error: userUpdateError,
    },
  ] = useUpdateUserMutation();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .min(minLength, "Password must be at least 6 characters"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const roleSelection = async (e: any) => {
    const rId = e.target.value;
    if (e.target.checked) {
      setRoleId((oldArray) => {
        return [...oldArray, rId];
      });
    } else {
      const index = roleId.indexOf(rId);
      if (index !== -1) {
        setRoleId((oldArray) => {
          const newArray = [...oldArray];
          const filteredArray = newArray.filter((_, i) => i !== index);
          return filteredArray;
        });
      }
    }
  };

  const getAllRoles = async () => {
    try {
      const response = await fetch(`/api/authorization/roles`);
      const responseData = await response.json();
      setRoles(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log("user", user?.data?.roles);
    if (user?.data) {
      setValue("name", user.data.name);
      setValue("email", user.data.email);
      getAllRoles();
      setRoleId(user?.data?.roles.map((role: any) => role.id));
    }
  }, [user]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const extendedData = {
      ...data,
      id: id,
      roleIds: roleId,
    };
    try {
      const responseData = await updateUser(extendedData);

      debugLog(`new user create response from Redux mutation`, extendedData);
    } catch (error) {
      console.log(error);
    }
  };

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return (
    <>
      <PageHeadingTemplate heading="Update User" />

      {userIsLoading && <CircularProgress />}
      {!userIsLoading && (
        <Card sx={{ width: 320 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>{message}</p>

            <div>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  startDecorator={<PersonIcon />}
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
                <FormHelperText>
                  {errors.name && (
                    <p className="text-red-500">
                      {errors?.name?.message?.toString()}
                    </p>
                  )}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel>Your Email</FormLabel>
                <Input
                  startDecorator={<MailIcon />}
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                />
                <FormHelperText>
                  {errors.email && (
                    <p className="text-red-500">
                      {errors?.email?.message?.toString()}
                    </p>
                  )}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel>Your Password</FormLabel>

                <Stack
                  spacing={0.5}
                  sx={{
                    "--hue": Math.min(passValue.length * 10, 120),
                  }}
                >
                  <Input
                    type="password"
                    placeholder="Type in here…"
                    startDecorator={<Key />}
                    {...register("password")}
                  />
                  <LinearProgress
                    determinate
                    size="sm"
                    value={Math.min((passValue.length * 100) / minLength, 100)}
                    sx={{
                      bgcolor: "background.level3",
                      color: "hsl(var(--hue) 80% 40%)",
                    }}
                  />
                  <Typography
                    level="body-xs"
                    sx={{
                      alignSelf: "flex-end",
                      color: "hsl(var(--hue) 80% 30%)",
                    }}
                  >
                    {passValue.length < 3 && "Very weak"}
                    {passValue.length >= 3 && passValue.length < 6 && "Weak"}
                    {passValue.length >= 6 && passValue.length < 10 && "Strong"}
                    {passValue.length >= 10 && "Very strong"}
                  </Typography>
                </Stack>
                <FormHelperText>
                  {errors.password && (
                    <p className="text-red-500">
                      {errors?.password?.message?.toString()}
                    </p>
                  )}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="mb-4">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={role.id}
                    id={role.id}
                    checked={roleId.includes(role.id)}
                    onChange={roleSelection}
                  />
                  <label
                    htmlFor={role.id}
                    className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                  >
                    {role.name}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <Button
                type="submit"
                color="success"
                variant="outlined"
                disabled={userUpdateIsLoading}
                loading={userUpdateIsLoading}
              >
                Update User
              </Button>

              {userUpdateIsSuccess && <div>User Updated</div>}
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default FormUserUpdate;
