import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

export const useAuth = () => {
  const Navigator = useNavigate();
  const { hasLogin, setLogin } = useStore(state => state);

  const logout = () => {
    setLogin(false);
    storage.clearToken();
    Navigator('/');
  };

  return { hasAuth: hasLogin, logout };
};
