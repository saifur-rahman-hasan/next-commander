import * as React from 'react';
import {CssVarsProvider, useColorScheme} from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle({
	                                          onClick,
	                                          sx,
	                                          ...props
                                          }: IconButtonProps) {
	
	// const { mode, setMode } = useColorScheme();
	
	const [mounted, setMounted] = React.useState(false);

	// React.useEffect(() => {
	// 	setMounted(true);
	// }, []);

	if (!mounted) {
		return (
			<CssVarsProvider disableTransitionOnChange>
			<IconButton
				size="sm"
				variant="outlined"
				color="neutral"
				{...props}
				sx={sx}
				disabled
			/>
			</CssVarsProvider>
		);
	}
	return (
		<CssVarsProvider disableTransitionOnChange>
		<IconButton
			id="toggle-mode"
			size="sm"
			variant="outlined"
			color="neutral"
			{...props}

		>
			<DarkModeRoundedIcon />
			<LightModeIcon />
		</IconButton>
		</CssVarsProvider>
	);
}
