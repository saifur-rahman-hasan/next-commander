"use client"

import FolderIcon from '@mui/icons-material/Folder';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function CondensedBreadcrumbs() {
	const [condensed, setCondensed] = React.useState<boolean>(true);
	const [navigationItems, setNavigationItems] = React.useState<string[]>([
		'Programs',
		'Files',
		'Services',
	]);

	return (
		<Breadcrumbs separator="›" aria-label="breadcrumbs">
			{condensed ? (
				<Button
					size="sm"
					onClick={() => {
						setNavigationItems((prev) => ['Root', 'Home', ...prev]);
						setCondensed(false);
					}}
					variant="plain"
					color="primary"
				>
					•••
				</Button>
			) : null}
			{navigationItems.map((item: string) => (
				<Link key={item} color="primary" href="#condensed-breadcrumbs">
					<FolderIcon sx={{ mr: 0.5 }} color="inherit" />
					{item}
				</Link>
			))}
			<Typography sx={{ display: 'flex', alignItems: 'center' }}>
				<FolderIcon sx={{ mr: 0.5 }} />
				bablo.txt
			</Typography>
		</Breadcrumbs>
	);
}