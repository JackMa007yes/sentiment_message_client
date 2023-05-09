import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store';
import { OutputRounded } from '@mui/icons-material';
import { Divider, IconButton, Tooltip } from '@mui/material';
import Avatar from '../ui/Avatar';

export default function ProfileCard() {
  const profile = useStore(state => state.profile);
  const { logout } = useAuth();

  return (
    <section className='bg-gradient-to-br from-primary-color to-pink-500 text-white rounded-2xl w-full px-4 py-6'>
      <h4 className='font-bold mb-2'>{profile?.name}</h4>
      <section className='text-xs mb-6'>{profile?.desc || 'no description'}</section>
      <Divider sx={{ borderColor: 'white' }} />
      <section className='flex justify-between mt-3'>
        <Avatar user={profile} className='w-12 h-12 rounded-[50%] overflow-hidden' />
        <section className='flex items-center'>
          <Tooltip title='Log out'>
            <IconButton color='primary' onClick={logout}>
              <OutputRounded fontSize='small' sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </section>
      </section>
    </section>
  );
}
