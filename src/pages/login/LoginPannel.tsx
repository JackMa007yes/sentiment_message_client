import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Button, FormControl } from '@mui/material';
import CustomTextField from '@/components/ui/CustomTextFiled';
import { Login } from '@/api';
import storage from '@/utils/storage';
import { useStore } from '@/store';

interface Props {
  onJump: () => void;
}
export default function LoginPannel({ onJump }: Props) {
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      mutateAsync({
        name,
        password
      });
    } else {
      enqueueSnackbar('Please check the input', { variant: 'warning' });
    }
  };

  return (
    <div className='rounded-3xl flex flex-col gap-10 w-full'>
      <h1 className='text-2xl'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: '100%', mb: 3 }}>
          <CustomTextField
            id='name'
            placeholder='name'
            color='secondary'
            value={name}
            InputLabelProps={{
              shrink: true
            }}
            required
            fullWidth
            onChange={(event: any) => setName(event.target.value)}
          ></CustomTextField>
        </FormControl>

        <FormControl sx={{ width: '100%', mb: 3 }}>
          <CustomTextField
            id='password'
            placeholder='password'
            color='secondary'
            value={password}
            type='password'
            InputLabelProps={{
              shrink: true
            }}
            // variant='filled'
            className='w-full mt-40'
            required
            onChange={(event: any) => setPassword(event.target.value)}
          />
        </FormControl>

        <Button size='large' type='submit' variant='contained' sx={{ borderRadius: '12px', width: '100%' }}>
          Login
        </Button>
      </form>

      <h4 className='-mt-4 font-sm text-primary-text'>
        Don&apos;t have a account?
        <Button onClick={() => onJump()}>Sign Up</Button>
      </h4>
    </div>
  );
}
