import { Container } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Container)`
	#header {
		display: flex;
		padding: 20px 0;

		.logo {
			font-size: 20px;
			margin-top: 6px;
			use-select: none;
		}

		.login {
			margin-left: auto;
		}
	}
`;