import { useRoutes, Navigate } from 'react-router-dom';
import Room from '@/pages/room';
import Login from '@/pages/login';
import Landing from '@/pages/landing';
import { useAuth } from '@/hooks/useAuth';

const protectedRoutes = [
  {
    path: '/app',
    element: <Room />
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
