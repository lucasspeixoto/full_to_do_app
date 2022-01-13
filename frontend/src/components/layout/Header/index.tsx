import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HeaderUserbox } from './UserBox';
import { Notifications } from './Notifications';

import Logo from '@assets/logo.png';

const HeaderWrapper = styled(Box)(
	({ theme }) => `
		height: ${theme.header.height};
		color: ${theme.header.textColor};
		padding: ${theme.spacing(0, 2)};
		right: 0;
		z-index: 5;
		background-color: ${theme.header.background};
		box-shadow: ${theme.header.boxShadow};
		position: fixed;
		justify-content: space-between;
		width: 100%;
		border-bottom: 4px solid ${theme.footer.borderColor};;
`,
);

export const Header = () => {
	return (
		<HeaderWrapper display='flex' alignItems='center'>
			<Box
				sx={{ p: 0 }}
				display='flex'
				alignItems='center'
				justifyContent='start'
			>
				<img width='90px' height='40px' alt='Logo' src={Logo} />
			</Box>
			<Box display='flex' alignItems='center'>
				<Notifications />
				<HeaderUserbox />
			</Box>
		</HeaderWrapper>
	);
};
