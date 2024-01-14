import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
// icons

const PageHeadingTemplate = ({
	heading,
	addText,
	addLink,
	addAssignText,
	addAssignLink,
}: {
	heading: string;
	addText?: string;
	addLink?: string;
	addAssignText?: string;
	addAssignLink?: string;
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				my: 1,
				gap: 1,
				flexDirection: { xs: "column", sm: "row" },
				alignItems: { xs: "start", sm: "center" },
				flexWrap: "wrap",
				justifyContent: "space-between",
			}}
		>
			<Typography level="h2">{heading}</Typography>
			<Box
				sx={{
					display: "flex",
					my: 1,
					gap: 1,
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { xs: "start", sm: "center" },
					flexWrap: "wrap",
					justifyContent: "space-between",
				}}
			>
				{addText && addLink && (
					<Button color="primary" size="sm" className="bg-black">
						<Link href={`${addLink}`}>{addText}</Link>
					</Button>
				)}
				{addAssignText && addAssignLink && (
					<Button color="primary" size="sm" className="bg-black">
						<Link href={`${addAssignLink}`}>{addAssignText}</Link>
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default PageHeadingTemplate;
