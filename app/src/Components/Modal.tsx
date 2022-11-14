
import { Box, Container, Modal, Typography } from '@mui/material';

interface Props {
	open: boolean,
	close: () => void;
	title?: any,
	body?: any,
	actions?: any
}

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

export default function CustomModal({open, close, title = '', body = '', actions}: Props) {
	return <Modal
		open={open}
		onClose={() => close()}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
		>
		<Box sx={style}>
			<Typography id="modal-modal-title" variant="h6" component="h2">
				{title}
			</Typography>
			{body}
		</Box>
	</Modal>
}