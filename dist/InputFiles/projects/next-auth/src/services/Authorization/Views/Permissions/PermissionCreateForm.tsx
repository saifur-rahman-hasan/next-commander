"use client";

import * as React from "react";
// icons

import useScript from "@/hooks/useScript";
import { zodResolver } from "@hookform/resolvers/zod";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { Button, FormHelperText } from "@mui/joy";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const CreatePermission = (props: any) => {
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const router = useRouter();

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const schema = z.object({
    name: z.string().min(3).max(255),
  });

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const fetchPermission = async (id: string) => {
    const response = await fetch(`/api/authorization/permission/${id}`, {
      method: "GET",
    });
    try {
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        setValue("name", responseData.data.name);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (id) {
    React.useEffect(() => {
      fetchPermission(id);
    }, [id]);
  }

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setDisabled(true);
    setLoading(true);

    const fetchLink = "/api/authorization/permissions";

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
              <FormLabel>Permission Name</FormLabel>
              <Input
                startDecorator={<EnhancedEncryptionIcon />}
                type="text"
                {...register("name")}
                placeholder="Permission Name"
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
              Add Permission
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreatePermission;
