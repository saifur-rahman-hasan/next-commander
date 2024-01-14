"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { zodResolver } from "@hookform/resolvers/zod";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import { Button, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const CreateRole = (props: any) => {
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  const schema = z.object({
    name: z.string().min(3).max(255),
  });

  const { handleSubmit, reset, register } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setDisabled(true);
    setLoading(true);

    const fetchLink = "/api/authorization/roles";

    const response = await fetch(fetchLink, {
      method: "POST",
      body: JSON.stringify(data),
    });
    try {
      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message);
        console.log(responseData.message);
        reset();
        props.onSubmitSuccess();
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
    setLoading(false);
  };

  return (
    <>
      <Card sx={{ width: 320 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{message}</p>
          <div>
            <FormControl>
              <FormLabel>Role Name</FormLabel>
              <Input
                startDecorator={<SwipeRightAltIcon />}
                type="text"
                {...register("name")}
                placeholder="Role Name"
              />
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
              Create Role
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateRole;
