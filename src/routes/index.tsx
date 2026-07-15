import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Temporary page placeholders so we can test navigation
const TempHome = () => <h1 className="text-3xl font-bold">Good morning</h1>;
const TempSearch = () => <h1 className="text-3xl font-bold">Browse all</h1>;
const TempLibrary = () => <h1 className="text-3xl font-bold">Your Library</h1>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TempHome />,
      },
      {
        path: 'search',
        element: <TempSearch />,
      },
      {
        path: 'library',
        element: <TempLibrary />,
      },
    ]
  },
]);