import { CssBaseline } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProviderWrapper from '@contexts/ThemeContext';

import { Routes } from '@core/config/routes';

const App = () => {
	return (
		<ThemeProviderWrapper>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<CssBaseline />
				<Routes />
			</LocalizationProvider>
		</ThemeProviderWrapper>
	);
};

export default App;
