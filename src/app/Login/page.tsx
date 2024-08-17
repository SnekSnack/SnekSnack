"use client"

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import "@/app/globals.css"

export default function Login() {
	const [isStaff, setIsStaff] = useState(false);
	const handleToggle = () => {
		setIsStaff((prev) => !prev);
	};

	return (
		<Box className="content-wrapper justify-center">
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: 3,
						boxShadow: 3,
						borderRadius: 2,
						backgroundColor: isStaff ? 'white' : '#ddd',
					}}
				>
					<Typography component="h1" variant="h5">
						{isStaff ? 'Staff Login' : 'Login'}
					</Typography>
					<Box
						component="form"
						sx={{ mt: 1 }}
						action={isStaff ? '/staff-login' : '/user-login'} // endpoints?
						method="POST"
					>
						<TextField
							sx={{ backgroundColor: 'white'}}
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							sx={{ backgroundColor: 'white'}}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							className="mt-4"
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Login
						</Button>
					</Box>
				</Box>
			</Container>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
				<Link href="#" variant="body2" onClick={handleToggle}>
					{isStaff ? 'Switch to User Login' : 'Switch to Staff Login'}
				</Link>
			</Box>
		</Box>
  )
}
