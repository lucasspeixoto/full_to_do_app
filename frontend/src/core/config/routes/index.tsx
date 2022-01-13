import { appRoutes } from '@config/routes/routes';
import { useRoutes } from 'react-router-dom';

export const Routes = () => {
	const app = useRoutes(appRoutes);

	return app;
};
