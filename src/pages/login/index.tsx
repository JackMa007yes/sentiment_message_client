import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Login } from '@/api';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

export default function LoginPage() {
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
    <div className='w-screen h-screen bg-slate-600 flex justify-center items-center'>
      <div className='bg-white w-[700px] h-[400px] rounded-3xl p-10 flex flex-col gap-14'>
        <h1 className='text-center'>登录</h1>

        <TextField
          id='name'
          label='name'
          value={name}
          InputLabelProps={{
            shrink: true
          }}
          variant='filled'
          className='w-full block p-4'
          onChange={event => setName(event.target.value)}
        />

        <TextField
          id='password'
          label='password'
          value={password}
          InputLabelProps={{
            shrink: true
          }}
          variant='filled'
          className='w-full mt-40'
          onChange={event => setPassword(event.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}
