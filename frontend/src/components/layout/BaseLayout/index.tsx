import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface BaseLayoutProps {
	children?: ReactNode;
}

const MainWrapper = styled(Box)(
	({ theme }) => `
		flex: 1 1 auto;
		display: flex;
		height: 100%;
`,
);

const MainContent = styled(Box)(
	({ theme }) => `
		margin-top: ${theme.header.height};
		flex: 1 1 auto;
		overflow: auto;
`,
);

const SidebarLayout: React.FC<BaseLayoutProps> = () => {
	return (
		<>
			<MainWrapper>
				<Header />
				<MainContent>
					<Outlet />
				</MainContent>
				<Footer />
			</MainWrapper>
		</>
	);
};

export default SidebarLayout;
