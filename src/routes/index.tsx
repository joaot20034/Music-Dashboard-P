import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout } from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const Search = lazy(() => import('../pages/Search'));
const Library = lazy(() => import('../pages/Library')); // NEW: Import actual library page

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: 'library',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Library />
          </Suspense>
        ),
      },
    ]
  },
]);