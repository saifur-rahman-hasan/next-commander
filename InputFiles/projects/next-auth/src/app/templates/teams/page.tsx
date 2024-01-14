import JoyTeamTeamplate from "@/components/templates/JoyTeamTeamplate";
import { StyledEngineProvider } from "@mui/joy/styles";

export default function TeamsPage() {
	return (
		<StyledEngineProvider injectFirst>
			<JoyTeamTeamplate />
		</StyledEngineProvider>
	);
}
