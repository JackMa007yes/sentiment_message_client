import { memo } from 'react';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import MapsUgcSharpIcon from '@mui/icons-material/MapsUgcSharp';
import Avatar from '@/components/ui/Avatar';

type Props = {
  user: User;
  disabled: boolean;
  onSelect: (id: number) => void;
};

function UserCard({ user, disabled, onSelect }: Props) {
  return (
    <div
      className={`h-full rounded-2xl w-full bg-[#33373f] flex justify-start items-center gap-4 pl-4  relative overflow-hidden`}
    >
      <Avatar user={user} className='w-24 h-24 rounded-lg overflow-hidden flex-0'></Avatar>
      <section className='text-xl text-white flex-1'>
        <section className='flex items-center mb-5 mt-2'>
          <span className='text-xl overflow-hidden whitespace-nowrap text-ellipsis'>{user.name}</span>
          <span className={`${!user.gender ? 'text-blue-400' : 'text-red-400'} h-8 ml-4`}>
            {!user.gender ? <MaleSharpIcon /> : <FemaleSharpIcon />}
          </span>
        </section>
        <section className='text-xs text-gray-400  h-8 line-clamp-2'>
          {user.desc || 'This user is lazy and writes nothing'}
        </section>
      </section>
      <span
        className={`w-10 flex justify-center items-center transition-all h-full text-white text-sm active:text-[#9c27b0]  ${
          disabled ? 'cursor-not-allowed bg-gray-500' : 'hover:scale-125 cursor-pointer bg-[#9c27b0] active:bg-white'
        }`}
        onClick={() => !disabled && onSelect(user.id)}
      >
        <MapsUgcSharpIcon />
      </span>
    </div>
  );
}

export default memo(UserCard);
