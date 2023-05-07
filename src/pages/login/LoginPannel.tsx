import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Login } from '@/api';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import CustomTextField from '@/components/ui/CustomTextFiled';

interface Props {
  onJump: () => void;
}
export default function LoginPannel({ onJump }: Props) {
  const navigator = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const setLogin = useStore(state => state.setLogin);

  const { mutateAsync } = useMutation(['Login'], Login, {
    onSuccess: data => {
      storage.setToken({ token: data.access_token });
      setLogin(true);
      navigator('/app');
    }
  });

  const handleLogin = () => {
    mutateAsync({
      name,
      password
    });
  };

  return (
    <div className='rounded-3xl flex flex-col gap-10 w-full'>
      <h1 className='font-bold text-2xl'>Log In</h1>
      <CustomTextField
        id='name'
        placeholder='name'
        color='secondary'
        value={name}
        InputLabelProps={{
          shrink: true
        }}
        onChange={(event: any) => setName(event.target.value)}
      ></CustomTextField>

      <CustomTextField
        id='password'
        // label='password'
        placeholder='password'
        color='secondary'
        value={password}
        type='password'
        InputLabelProps={{
          shrink: true
        }}
        // variant='filled'
        className='w-full mt-40'
        onChange={(event: any) => setPassword(event.target.value)}
      />
      <Button onClick={handleLogin} size='large' color='secondary' variant='contained' sx={{ borderRadius: '12px' }}>
        Login
      </Button>
      <h4 className='-mt-4 font-sm text-primary-text'>
        Don't have a account?
        <Button color='secondary' onClick={() => onJump()}>
          Sign Up
        </Button>
      </h4>
    </div>
  );
}
