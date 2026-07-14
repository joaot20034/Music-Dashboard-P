import { createBrowserRouter } from 'react-router-dom';

// Temporary placeholder until we build layouts/MainLayout.tsx
const TempLayout = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--text-main))]">
    <h1 className="text-2xl font-bold">App Shell Ready. Routing works!</h1>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TempLayout />,
    // We will inject our lazy-loaded child routes (Home, Search, etc.) here later
  },
]);