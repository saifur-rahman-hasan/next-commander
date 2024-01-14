# Create & Update Form in react-hook-form

## Create Functionality

- Create form with default values. (Additionally, I am using zod validation for form validation)

```
const profileSchema = z.object({
  first_name: z.string().nonempty({ message: "First name is required" }),
  last_name: z.string().nonempty({ message: "Last name is required" }),
});
const { register, handleSubmit, setValue } = useForm<
  z.infer<typeof profileSchema>
>({
  resolver: zodResolver(profileSchema),
  defaultValues: {
    first_name: "",
    last_name: "",
  },
});

```

- Create a onSubmit function to submit the data in the backend api.

```
const onSubmit = async (data: z.infer<typeof profileSchema>) => {
  const respose = await axios.post("/api/auth/profile", data);
  console.log(respose);
};
```

- Now create the form

```
<form onSubmit={handleSubmit(onSubmit)}>
  <label for="fname">First name:</label>
  <br />
  <input type="text" id="first-name" {...register("first_name")} />
  <label for="lname">Last name:</label>
  <br />
  <input type="text" id="last-name" {...register("last_name")} />
  <br />
  <br />
  <button type="submit">Submit</button>
</form>;
```

## Update Functionality

- To update the form data onload

```
const getData = useCallback(async () => {
  try {
    const response = await axios.get("/api/example/profile");
    if (response.status === 200) {
      setValue("first_name", response.data.data.first_name);
      setValue("last_name", response.data.data.last_name);
    }
  } catch (error: any) {
    console.log(error.response.data);
  }
}, [reset, setValue]);
```

## Caution

- **During Updating The Form Value**: If you want to create and update in the same form, then you don't need to define `useState` in your form. `react-hook-form` has built in `setValue` function.
- **Set Value After Completing The Function Works**: Don't `setValue` before the function complete its own process. To do that, if it is a success then set the value in the form. Otherwise, it own set the value correctly.
