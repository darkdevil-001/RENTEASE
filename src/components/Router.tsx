import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import FindRoomPage from '@/components/pages/FindRoomPage';
import RoomDetailsPage from '@/components/pages/RoomDetailsPage';
import ListRoomPage from '@/components/pages/ListRoomPage';
import OwnerDashboardPage from '@/components/pages/OwnerDashboardPage';
import RoommateGroupsPage from '@/components/pages/RoommateGroupsPage';
import SignupPage from '@/components/pages/SignupPage';
import LoginPage from '@/components/pages/LoginPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "find-room",
        element: <FindRoomPage />,
      },
      {
        path: "room/:id",
        element: <RoomDetailsPage />,
      },
      {
        path: "list-room",
        element: <ListRoomPage />,
      },
      {
        path: "owner-dashboard",
        element: <OwnerDashboardPage />,
      },
      {
        path: "roommate-groups",
        element: <RoommateGroupsPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
