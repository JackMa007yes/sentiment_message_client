import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Landing() {
  const { hasAuth } = useAuth();

  return <Navigate to={hasAuth ? '/app' : '/login'} replace={true} />;
}
