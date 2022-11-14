import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { GAMES } from '/src/constants/games';
// import Test from '/src/Games/Snek';

export default function Game() {
	let { gameId } = useParams<string>();
	// const [ game, setGame ] = useState<any>();
	const game = GAMES.filter(game => game.id.toString() === gameId)[0]; 
	

	useEffect(() => {
		// if (gameId) {
		// 	setGame();
		// }
		import(game.path)
			.then(obj => {
				new obj.default();
				// currentGame.init();
			});
	}, []);

	return <>
		<Box id="board">
			<Typography>Score: <span id="score">0</span></Typography>
		</Box>
		<Box sx={{textAlign: 'center'}}>
			<canvas width={500} height={500} className="gameCanvas" id="canvas"></canvas>
		</Box>
		
	</>
}