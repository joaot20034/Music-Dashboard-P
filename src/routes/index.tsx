import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout } from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const Search = lazy(() => import('../pages/Search'));
const Library = lazy(() => import('../pages/Library'));
const Playlist = lazy(() => import('../pages/Playlist'));
const Album = lazy(() => import('../pages/Album'));
const Artist = lazy(() => import('../pages/Artist'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound')); // NEW: Import NotFound

const PageLoader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />, // NEW: Catches all unmatched routes or rendering errors
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'search', element: <Suspense fallback={<PageLoader />}><Search /></Suspense> },
      { path: 'library', element: <Suspense fallback={<PageLoader />}><Library /></Suspense> },
      { path: 'playlist/:id', element: <Suspense fallback={<PageLoader />}><Playlist /></Suspense> },
      { path: 'album/:id', element: <Suspense fallback={<PageLoader />}><Album /></Suspense> },
      { path: 'artist/:id', element: <Suspense fallback={<PageLoader />}><Artist /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },
      { path: '*', element: <NotFound /> }, // NEW: Catch-all for undefined child routes
    ]
  },
]);