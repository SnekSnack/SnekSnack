"use client"
import api from "@/api";
import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import Image from 'next/image';


import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Modal } from '@mui/material';
import "@/app/globals.css"


export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const router = useRouter();
	const [openConsentModal, setOpenConsentModal] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//console.log("HELLO");
		try {
			const res = await api.post("/api/token/", { username, password });
			localStorage.setItem(ACCESS_TOKEN, res.data.access);
			localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
			api.get("/api/header/")
				.then((res) => res.data)
				.then((data) => {
					if (data.groups.length>0) {
						console.log("Admin Login")
						router.push("/Admin") // Admin
					} else {
						console.log("Student Login")
						setOpenConsentModal(true); // Student
					}
					console.log(data);
				})
				.catch((err) => {
					console.error(err);
				});
			setErrorMsg("")
		}
		catch (error:any) {
			if (error.response && error.response.status === 401) {
				setErrorMsg("Incorrect username or password");
			} else {
				setErrorMsg("An unexpected error occurred. Please try again later.");
			}
			console.log(error);
		}
	};

	const handleAgree = () => {
		setOpenConsentModal(false);
		router.push("/");
	}

	return (

		<div className="content-wrapper-full">
			{/* Logo */}
			<Image
        		src="/deakinuni.png" 
				alt="Deakin Logo"
				width={300}  
				height={300} 
				style={{
				position: 'absolute',
				bottom: '67%',
				left: '49%',
				transform: 'translateX(-50%)',
				marginBottom: 16,
				zIndex: 1,
        	}}
      	/>
		

			<Box className="content-wrapper-full justify-center">
				<Container component="main" maxWidth="xs">
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: 3,
							boxShadow: 3,
							borderRadius: 2,
							backgroundColor: 'white',
						}}
					>
						
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box
							component="form"
							sx={{ mt: 1 }}
							method="POST"
							onSubmit={handleSubmit}
						>
							<TextField
								sx={{ backgroundColor: 'white' }}
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<TextField
								sx={{ backgroundColor: 'white' }}
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Typography sx={{ color: 'red', fontSize: '0.875rem', marginBottom: '4px'}}>
								{errorMsg}
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
							By clicking &quot;Agree&quot;, you consent to the use of Artificial Intelligence in this assignment.
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
		</div>
	)
}
