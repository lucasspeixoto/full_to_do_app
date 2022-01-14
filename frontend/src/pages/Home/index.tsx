import React, { useState } from 'react';
import FilterCard from '@components/pages/FilterCard';

import { styled } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';

const FilterButton = styled(Button)(
	({ theme }) => `
  padding: 0;
  cursor: pointer;

	&:hover{
    background: none
  }
 
`,
);

const filters = [
	{ type: 'all', title: 'Todos' },
	{ type: 'today', title: 'Hoje' },
	{ type: 'week', title: 'Semana' },
	{ type: 'month', title: 'Mês' },
	{ type: 'year', title: 'Year' },
];

export const Home: React.FC = () => {
	const [filterActived, setFilterActived] = useState('all');

	return (
		<Grid
			container
			direction='row'
			justifyContent='space-evenly'
			sx={{ gap: '15px', p: '15px', mt: '15px' }}
		>
			{filters.map(filter => (
				<Grid item key={filter.type}>
					<FilterButton onClick={() => setFilterActived(filter.type)}>
						<FilterCard
							title={filter.title}
							actived={filterActived === filter.type}
						/>
					</FilterButton>
				</Grid>
			))}
		</Grid>
	);
};
