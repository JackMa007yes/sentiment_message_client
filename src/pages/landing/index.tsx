import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Landing() {
  const [hasAuth] = useAuth();
  console.log(888888);

  console.log(hasAuth);

  return <Navigate to={hasAuth ? '/app' : '/login'} replace={true} />;
}
