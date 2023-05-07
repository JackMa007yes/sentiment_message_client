import { useRoutes, Navigate } from 'react-router-dom';
import Room from '@/pages/room';
import Layout from '@/components/layout';
import Settings from '@/pages/settings';
import Users from '@/pages/users';
import Login from '@/pages/login';
import Landing from '@/pages/landing';
import { useAuth } from '@/hooks/useAuth';

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
        element: <Room />
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
  const [hasAuth] = useAuth();

  const routes = hasAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoute, ...routes]);

  return element;
}

export default AppRoutes;
