import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import filter from '@assets/filter.png';

const FilterCardContainer = styled(Card)(
	({ theme }) => `
  width: 220px;
  height: 70px;
  padding: 0;
  cursor: pointer;
  box-shadow: ${theme.colors.shadows.primary};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

 
  &:hover{
    background: ${theme.footer.borderColor}
  }
`,
);

interface FilterCardProps {
	title: string;
	actived: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, actived }) => {
	const theme = useTheme();

	return (
		<FilterCardContainer
			sx={{
				background: actived
					? theme.footer.borderColor
					: theme.colors.alpha.black[100],
			}}
		>
			<CardContent sx={{ p: 1 }}>
				<Grid container direction='row' justifyContent='space-between'>
					<Grid item sx={{ mt: 2, ml: 0.1 }}>
						<img src={filter} alt='Filtro' />
					</Grid>
					<Grid item sx={{ mt: 5, mr: 0.1 }}>
						<Typography
							variant='h3'
							sx={{ color: theme.colors.alpha.white[50] }}
						>
							{title}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</FilterCardContainer>
	);
};

export default FilterCard;
