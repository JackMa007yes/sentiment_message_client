import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Chat from '@/pages/chat';

const Layout = lazy(() => import('@/components/layout'));
const Settings = lazy(() => import('@/pages/settings'));
const Users = lazy(() => import('@/pages/users'));
const Login = lazy(() => import('@/pages/login'));
const Landing = lazy(() => import('@/pages/landing'));

// import Layout from '@/components/layout';
// import Settings from '@/pages/settings';
// import Users from '@/pages/users';
// import Login from '@/pages/login';
// import Landing from '@/pages/landing';

const protectedRoutes = [
  {
    path: '/app',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to='chat' />
      },
      {
        path: 'chat',
        element: <Chat />
      },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> }
    ]
  }
];

const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  }
];

const commonRoute = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '*',
    element: <Navigate to='/'></Navigate>
  }
];

function AppRoutes() {
  const { hasAuth } = useAuth();

  const routes = hasAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoute, ...routes]);

  return element;
}

export default AppRoutes;
