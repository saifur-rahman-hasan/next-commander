import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from "@mui/joy/Box";
import Link from "next/link";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
	persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

export default function ProductCreateForm(){
	return (
		<Stack gap={8} sx={{ mt: 2 }}>
			<form
				onSubmit={(event: React.FormEvent<SignInFormElement>) => {
					event.preventDefault();
					const formElements = event.currentTarget.elements;
					const data = {
						email: formElements.email.value,
						password: formElements.password.value,
						persistent: formElements.persistent.checked,
					};
					alert(JSON.stringify(data, null, 2));
				}}
			>
				<FormControl required>
					<FormLabel>Product Name</FormLabel>
					<Input type="text" name="productName" />
				</FormControl>

				<FormControl required>
					<FormLabel>Product Detail</FormLabel>
					<Input type="password" name="password" />
				</FormControl>

				<Stack gap={4} sx={{ mt: 2 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Checkbox size="sm" label="Remember me" name="persistent" />
						<Link href="/replace-with-a-link">
							Forgot your password?
						</Link>
					</Box>

					<Button variant="solid">Solid</Button>

					<Button
						color={'primary'}
						variant="solid"
						type="submit"
						fullWidth
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						Sign in
					</Button>
				</Stack>
			</form>
		</Stack>
	)
}