import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Register } from '@/api';
import CustomTextField from '@/components/ui/CustomTextFiled';
import { GenderEnum } from '@/constants/common';

interface Props {
  onJump: () => void;
}
export default function SignUpPannel({ onJump }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<GenderEnum>(GenderEnum.MALE);

  const { mutateAsync } = useMutation(['Register'], Register, {
    onSuccess: () => {
      enqueueSnackbar('Registration success', { variant: 'success' });
      onJump();
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      mutateAsync({
        name,
        password,
        gender
      });
    } else {
      enqueueSnackbar('Please check the input', { variant: 'warning' });
    }
  };

  return (
    <div className='rounded-3xl flex flex-col gap-10 w-full'>
      <h1 className='text-2xl'>Sign Up</h1>

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
            onChange={(event: any) => setName(event.target.value)}
          ></CustomTextField>
        </FormControl>

        <FormControl sx={{ width: '100%', mb: 3 }}>
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
            required
            onChange={(event: any) => setPassword(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mb: 3 }}>
          <RadioGroup row value={gender} onChange={(e, v) => setGender(Number(v))}>
            <FormControlLabel value={GenderEnum.MALE} control={<Radio sx={{ color: 'gray' }} />} label='Male' />
            <FormControlLabel value={GenderEnum.FEMALE} control={<Radio sx={{ color: 'gray' }} />} label='Female' />
          </RadioGroup>
        </FormControl>

        <Button size='large' type='submit' variant='contained' sx={{ borderRadius: '12px', width: '100%' }}>
          SIGN UP
        </Button>
      </form>

      <h4 className='-mt-4 font-sm text-primary-text'>
        Already have a account?
        <Button onClick={() => onJump()}>Login In</Button>
      </h4>
    </div>
  );
}
