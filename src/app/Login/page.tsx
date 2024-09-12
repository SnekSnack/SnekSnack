"use client"
import api from "@/api";
import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";


import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import "@/app/globals.css"


export default function Login() {
	const [isStaff, setIsStaff] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleToggle = () => {
		setIsStaff((prev) => !prev);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("HELLO");
		try {
			const res = await api.post("/api/token/", { username, password })
			localStorage.setItem(ACCESS_TOKEN, res.data.access);
			localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
			// router.push("/")
		}
		catch (error) {
			alert(error)
			console.log(error);
		}
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
						<Button
							className="button mt-4"
							type="submit"
							fullWidth
							variant="contained"
							color="primary" //temporary href
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
