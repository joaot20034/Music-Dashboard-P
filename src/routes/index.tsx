import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout } from '../layouts/MainLayout';

// Lazy loading the Home page
const Home = lazy(() => import('../pages/Home'));

const TempSearch = () => <h1 className="text-3xl font-bold">Browse all</h1>;
const TempLibrary = () => <h1 className="text-3xl font-bold">Your Library</h1>;

// Minimal suspense loader to prevent UI flashing
const PageLoader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
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