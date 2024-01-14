import * as React from "react";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";

interface Options {
  id: number;
  value: string;
  label: string;
}
interface SelectMultipleFormSubmissionProps {
  options?: Options[];
  isMulti?: boolean;
  selected?: string[];
}

const SelectForm: React.FC<SelectMultipleFormSubmissionProps> = ({
  options: incoming = [
    {
      id: 1,
      value: "option_1",
      label: "Option 1",
    },
    {
      id: 2,
      value: "option_2",
      label: "Option 2",
    },
    {
      id: 3,
      value: "option_3",
      label: "Option 3",
    },
  ],
  isMulti = false,
  selected = ["option_2"],
}) => {
  const [options, setOptions] = React.useState<Options[]>(incoming);
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const getSelectOptions = options.filter((option) =>
      formJson.pets.includes(option.value)
    );

    alert(JSON.stringify(getSelectOptions));
  };

  return (
    <form onSubmit={submitForm}>
      <Stack spacing={2} alignItems="flex-start">
        {/*<Select*/}
        {/*  placeholder="Select a pet"*/}
        {/*  name="pets"*/}
        {/*  required*/}
        {/*  multiple={isMulti}*/}
        {/*  defaultValue={selected}*/}
        {/*  sx={{ minWidth: 200 }}*/}
        {/*>*/}
        {/*  {options &&*/}
        {/*    options.map((option, index) => (*/}
        {/*      <Option key={index} value={option?.value}>*/}
        {/*        {option?.label}*/}
        {/*      </Option>*/}
        {/*    ))}*/}
        {/*</Select>*/}
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
export default SelectForm;
