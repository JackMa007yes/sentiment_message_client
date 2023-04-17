import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

export const useAuth = () => {
  const Navigator = useNavigate();
  const hasLogin = useStore(state => state.hasLogin);
  const setLogin = useStore(state => state.setLogin);

  const logout = () => {
    setLogin(false);
    storage.clearToken();
    Navigator('/');
  };

  return [hasLogin, logout];
};
