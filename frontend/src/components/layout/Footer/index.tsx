import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled(Box)(
	({ theme }) => `
		height: ${theme.footer.height};
		color: ${theme.footer.textColor};
		padding: ${theme.spacing(2, 2)};
		z-index: 5;
		background-color: ${theme.footer.background};
		box-shadow: ${theme.footer.boxShadow};
		position: fixed;
    bottom: 0;
		justify-content: space-between;
		width: 100%;
    border-top: 2px solid ${theme.footer.borderColor};;
`,
);

export const Footer: React.FC = () => {
	return (
		<FooterWrapper>
			<Box display='flex' alignItems='center' justifyContent='center'>
				<Typography variant='h4'>ToDO - Organizando a sua vida</Typography>
			</Box>
		</FooterWrapper>
	);
};
