import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
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
import AvatarSetting from './AvatarSetting';
import { useStore } from '@/store';
import { GetProfile, UpdateProfile } from '@/api';

export default function index() {
  const { profile, setProfile } = useStore(state => state);
  const [form, setForm] = useState<Partial<UpdateProfileData>>({});
  const [changed, setChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { refetch } = useQuery(['GetProfile'], GetProfile, {
    onSuccess: setProfile
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
      name: form.name || profile!.name,
      gender: typeof form.gender === 'number' ? form.gender : profile!.gender,
      desc: form.desc || profile!.desc
    });
  };

  useEffect(() => {
    type KeyType = keyof UpdateProfileData;
    setChanged((Object.keys(form) as KeyType[]).some(key => form[key] !== profile?.[key]));
  }, [form, profile]);

  return profile ? (
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
              defaultValue={profile?.name}
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
              defaultValue={profile?.gender}
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
              defaultValue={profile?.desc}
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
