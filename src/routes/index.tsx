import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout } from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const Search = lazy(() => import('../pages/Search'));
const Library = lazy(() => import('../pages/Library'));
const Playlist = lazy(() => import('../pages/Playlist'));
const Album = lazy(() => import('../pages/Album'));
const Artist = lazy(() => import('../pages/Artist'));
const Profile = lazy(() => import('../pages/Profile')); // NEW
const Settings = lazy(() => import('../pages/Settings')); // NEW

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
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'search', element: <Suspense fallback={<PageLoader />}><Search /></Suspense> },
      { path: 'library', element: <Suspense fallback={<PageLoader />}><Library /></Suspense> },
      { path: 'playlist/:id', element: <Suspense fallback={<PageLoader />}><Playlist /></Suspense> },
      { path: 'album/:id', element: <Suspense fallback={<PageLoader />}><Album /></Suspense> },
      { path: 'artist/:id', element: <Suspense fallback={<PageLoader />}><Artist /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> }, // NEW
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> }, // NEW
    ]
  },
]);