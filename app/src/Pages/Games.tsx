import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GAMES } from '/src/constants/games';

export default function Games() {
	useEffect(() => {
		// console.log(GAMES);
	}, []);

	return <Stack spacing={2}>
			{GAMES.map((game, index) => 
				<Link key={index} to={"/games/" + game.id}>{game.title}</Link>
			)}
		</Stack>
}