"use client"

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, Modal } from '@mui/material';
import "@/app/globals.css"

export default function Login() {
	const [isStaff, setIsStaff] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const [openConsentModal, setOpenConsentModal] = useState(false);
	
	const handleToggle = () => {
		setIsStaff((prev) => !prev);
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		/** authenticate */
		// setLoginFailed(true); // if failed, set true to show error message

		if (isStaff) {
			window.location.href = '/Admin';
		} else {
			setOpenConsentModal(true);
		}
	}

	const handleAgree = () => {
		setOpenConsentModal(false);
		window.location.href = '/';
	}

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
						onSubmit={handleLogin}
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
						<Typography hidden={!loginFailed} className="text-red-800" variant="body2">
							Incorrect email and/or password.
						</Typography>
						<Button
							className="button mt-4"
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

			{/* Consent Popup Modal */}
			<Modal
				open={openConsentModal}
				onClose={() => setOpenConsentModal(false)}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
						AI Consent
					</Typography>
					<Typography sx={{ mb: 3 }}>
						By continuing, you consent to the use of Artificial Intelligence in this assignment. Please click "Agree" to proceed.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAgree}
						fullWidth
					>
						Agree
					</Button>
				</Box>
			</Modal>

		</Box>
  )
}
