import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import AvatarSetting from './AvatarSetting';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { useStore } from '@/store';
import { GetProfile, UpdateProfile } from '@/api';

export default function index() {
  const { user, setUser } = useStore(state => state);
  const [form, setForm] = useState<Partial<UpdateProfileData>>({});
  const [changed, setChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { refetch } = useQuery(['GetProfile'], GetProfile, {
    onSuccess: setUser
  });

  const { mutate: updateMutate } = useMutation(['UpdateProfile'], UpdateProfile, {
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Update profile success', { variant: 'success' });
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateMutate({
      name: form.name || user!.name,
      gender: typeof form.gender === 'number' ? form.gender : user!.gender,
      desc: form.desc || user!.desc
    });
  };

  useEffect(() => {
    type KeyType = keyof UpdateProfileData;
    setChanged((Object.keys(form) as KeyType[]).some(key => form[key] !== user?.[key]));
  }, [form, user]);

  return user ? (
    <div className='py-8 px-4'>
      <AvatarSetting />
      <Divider sx={{ margin: '40px 0' }} />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box component='span' sx={{ py: 2 }}>
            <FormLabel id='settings-name' sx={{ width: '200px', display: 'inline-block' }}>
              Name
            </FormLabel>
            <TextField
              type='text'
              variant='standard'
              defaultValue={user?.name}
              required
              sx={{ width: 300 }}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </Box>

          <Box component='span' sx={{ py: 2 }}>
            <FormLabel id='settings-gender' sx={{ width: '200px', display: 'inline-block' }}>
              Gender
            </FormLabel>
            <RadioGroup
              defaultValue={user?.gender}
              name='radio-buttons-group'
              row
              aria-required
              sx={{ display: 'inline-block' }}
              onChange={(e, v) => setForm({ ...form, gender: Number(v) })}
            >
              <FormControlLabel value={0} control={<Radio />} label='Female' />
              <FormControlLabel value={1} control={<Radio />} label='Male' />
              {/* <FormControlLabel value='2' control={<Radio />} label='Other' /> */}
            </RadioGroup>
          </Box>

          <Box sx={{ py: 2 }}>
            <FormLabel id='settings-description' sx={{ width: '200px', display: 'inline-block' }}>
              Personal Descriptive
            </FormLabel>
            <TextField
              type='text'
              variant='standard'
              defaultValue={user?.desc}
              sx={{ width: 300 }}
              required
              onChange={e => setForm({ ...form, desc: e.target.value })}
            />
          </Box>

          <Box sx={{ py: 8 }}>
            <Button variant='outlined' color='secondary' type='submit' disabled={!changed}>
              Confirm
            </Button>
          </Box>
        </FormControl>
      </form>
    </div>
  ) : null;
}
