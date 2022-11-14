import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { StyledContainer } from "./Main.style";
import { useRef, useState } from "react";
import CustomModal from "../Components/Modal";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
	username: yup.string().required(),
	password: yup.string().required(),
  }).required();

const style = {
	position:  'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#ffe',
	color: '#000',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

  type Inputs = {
	username: string,
	password: string,
  };
  

export default function Main() {
	const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<Inputs>({
		resolver: yupResolver(schema)
	});
	const [open, setOpen] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data);
		console.log('login');
	}

	return <StyledContainer maxWidth="xl">
		<Box id="header">
			<Link className="logo" to="/">Colibricode</Link>
			{/* <Button className="login" variant="outlined" onClick={() => setOpen(true)}>Log in</Button> */}
		</Box>
		<Outlet />
		<CustomModal 
			open={open} 
			close={() => setOpen(false)} 
			title="Log in"
			body={
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack spacing={2} sx={{ mt: 2 }}>
						<>
							<TextField
								{...register("username")} 
								label="Username" 
								variant="standard"
								error={errors.username?.message ? true : false}
							/>
							{ errors.username?.message &&
								<Typography sx={{mt: '0 !important', color: 'red'}} variant="caption">{errors.username?.message}</Typography>
							}
						</>
						<>
							<TextField 
								{...register("password")}  
								label="Password" 
								variant="standard" 
								error={errors.password?.message ? true : false} 
							/>
							{ errors.password?.message &&
								<Typography sx={{mt: '0 !important', color: 'red'}} variant="caption">{errors.password?.message}</Typography>
							}
						</>
						<Button disabled={!isValid} sx={{p: 2, mt: '60px !important'}} variant="outlined" type="submit">Log in</Button>
					</Stack>
				</form>
			}
		/>
	</StyledContainer>;
}