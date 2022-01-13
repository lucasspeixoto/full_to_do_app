import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.component';

ReactDOM.render(
	<HelmetProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</HelmetProvider>,
	document.getElementById('root'),
);
