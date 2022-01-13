import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import BaseLayout from '@components/layout/BaseLayout';
import { Home } from '@pages/Home';
import { Task } from '@pages/Task';
import { QrCode } from '@pages/QrCode';

export const appRoutes: RouteObject[] = [
	{
		path: '*',
		element: <BaseLayout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'task',
				element: <Task />,
			},
			{
				path: 'qrcode',
				element: <QrCode />,
			},
			{
				path: '*',
				element: <Navigate to='' replace />,
			},
		],
	},
];
