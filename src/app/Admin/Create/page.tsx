"use client";

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import Link from 'next/link';
import { Box, Button, TextField } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import Dropdown from '@/components/Dropdown';
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';

export default function Assignment() {
	return(
		<>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Header userName="username"/>
			{/* Stuff copied from HeaderBox bc idk how to put contents into the box rn */}
			<Box
				sx={{
					marginTop: 4,
					display: 'flex',
					flexDirection: 'column',
					// alignItems: 'center',
					height: 500,
					width: '80%',
					bgcolor: 'pink',
					borderRadius: 2,
					boxShadow: 5,
					// p: 4,
					mx: 'auto', 
				}}
				>
					{/*<Box
					sx={{
					// marginTop: 4,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 65,
					width: '100%',
					bgcolor: 'lightpink',
					borderRadius: 2,
					// boxShadow: 24,
					p: 4,
					mx: 'auto', // Horizontal centering
					// textAlign: 'left',
					}}
				>
					<h1>Assignment name</h1>
					
					<Link
					className="hover:underline"
					href="/Admin/Create"
					>
					Select release Date
					</Link>
				</Box>*/}
				<Box
					sx={{
						// marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
						// alignItems: 'center',
						height: '100%',
						width: '100%',
						// bgcolor: 'success.main',
						borderRadius: 2,
						// boxShadow: 24,
						gap: 2,
						p: 4,
						mx: 'auto', // Horizontal centering
						// textAlign: 'left',
						}}
				>
					
					{/* testing */}
					{/* temporary dropdown code (before using the reusable) */}
					<Box display="flex" alignItems= 'center'>
						<Box sx = {{width: "40%", }}>
							<strong>Assignment Name</strong>
						</Box>
						<TextField/>
					</Box>

					<Box display="flex" alignItems= 'center'>
						<Box sx = {{width: "40%", }}>
						Release Date
						</Box>
						<DateField/>
					</Box>

					<Box display="flex" alignItems= 'center'>
						<Box sx = {{width: "40%", }}>
							Close Date
						</Box>
						<DateField/>
					</Box>

					<Box display="flex" alignItems= 'center'>
						<Box sx = {{width: "40%", }}>
							Time Limit
						</Box>
						<TimeField/>
					</Box>

					<Box display="flex" alignItems= 'center'>
						<Box sx = {{width: "40%", }}>
							Question Limit
						</Box>
						<TextField/>
					</Box>

					<Box display="flex" className="mt-5" alignItems= 'top'>
						<Box sx = {{width: "40%", }}>
							Prompt
						</Box>
						<TextField multiline rows={4}/>
					</Box>





					<Box
					sx = {{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						gap: 1, 
						width: '100%',
						// height: '0%'
					}}
					>
						<Button
						variant="contained"
						href="/Admin" // REDIRECT TO ADMIN PAGE BUT WITH ASSIGNMENT ADDED??!! DK HOW YET
						sx={{ 
							bgcolor: "primary.main", 
							color: "white", 
							gap: 1 , 
							// width: '30%'
							}}
						// disabledcondition // NEED TO IMPLEMENT TO HANDLE ASSIGN TO AND PATIENT NOT BEING SELECTED!!
						>
							Save
							<SaveIcon/>
						</Button>
						<Button
						variant="contained"
						href="/Admin" // REDIRECT TO ADMIN PAGE BUT WITH ASSIGNMENT ADDED??!! DK HOW YET
						sx={{ 
							bgcolor: "primary.main", 
							color: "white", 
							gap: 1 , 
							// width: '30%'
							}}
						// disabledcondition // NEED TO IMPLEMENT TO HANDLE ASSIGN TO AND PATIENT NOT BEING SELECTED!!
						>
							Publish
							<PublishIcon/>
						</Button>
					</Box>
					{/* publish assignment */}
					{/* <Box
					sx = {{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100%'
					}}
					>
						<Button
						variant="contained"
						href="/Admin" // REDIRECT TO ADMIN PAGE BUT WITH ASSIGNMENT ADDED??!! DK HOW YET
						sx={{ 
							bgcolor: "primary.main", 
							color: "white", 
							gap: 1 , 
							// width: '30%'
							}}
						// disabledcondition // NEED TO IMPLEMENT TO HANDLE ASSIGN TO AND PATIENT NOT BEING SELECTED!!
						>
							Publish
							<PublishIcon/>
						</Button>
					</Box> */}
					
					
				</Box>
				
			</Box>
		</LocalizationProvider>
		</>
		
	)
}


