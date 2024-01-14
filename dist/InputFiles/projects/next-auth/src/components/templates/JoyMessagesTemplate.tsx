"use client"

import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/mui/Sidebar';
import Header from '@/components/mui/Header';
import MyMessages from '@/components/mui/MyMessages';

export default function JoyMessagesTemplate() {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box sx={{ display: 'flex', minHeight: '100dvh' }}>
				<Sidebar />
				<Header />
				<Box component="main" className="MainContent" sx={{ flex: 1 }}>
					<MyMessages />
				</Box>
			</Box>
		</CssVarsProvider>
	);
}
