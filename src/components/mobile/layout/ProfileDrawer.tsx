import { Button, Divider, Drawer } from '@mui/material';
import { useStore } from '@/store';
import Avatar from '@/components/ui/Avatar';
import { ExitToApp, FemaleSharp, MaleSharp } from '@mui/icons-material';
import { useToggle } from 'react-use';
import { GenderEnum } from '@/constants';
import LogoutModal from './LogoutModal';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileDrawer({ open, onClose }: Props) {
  const profile = useStore(state => state.profile);
  const [modalDisplay, toggleModalDisplay] = useToggle(false);

  return (
    <>
      <Drawer anchor='right' PaperProps={{ sx: { bgcolor: '#20232b' } }} open={open} onClose={onClose}>
        <div className='w-[60vw] p-8 h-full flex flex-col'>
          <Avatar user={profile} className='w-16 h-16 rounded-[50%] overflow-hidden my-4' />
          <section className='py-4 h-full flex-1'>
            <Divider />
            <section className='py-4 '>
              <section className='font-bold text-xl mb-4 flex items-center'>
                {profile?.name}
                <span className={`${profile?.gender === GenderEnum.MALE ? 'text-blue-400' : 'text-red-400'} h-8 ml-4`}>
                  {profile?.gender === GenderEnum.MALE ? <MaleSharp /> : <FemaleSharp />}
                </span>
              </section>
              <section>{profile?.desc || 'This user is lazy and writes nothing'}</section>
            </section>
          </section>
          <Button variant='contained' size='large' endIcon={<ExitToApp />} onClick={toggleModalDisplay}>
            Log out
          </Button>
        </div>
      </Drawer>
      <LogoutModal open={modalDisplay} onClose={toggleModalDisplay} />
    </>
  );
}
