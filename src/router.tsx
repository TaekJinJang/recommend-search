import Home from 'pages/Home';
import {createBrowserRouter} from 'react-router-dom';

const route = [
    {
        path: '',
        element: <Home />,
        errorElement: <div>Error</div>,
    },
];

const router = createBrowserRouter(route);

export default router;
