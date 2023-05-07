import { getBase64 } from '@/utils/avatar';
import React from 'react';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import MapsUgcSharpIcon from '@mui/icons-material/MapsUgcSharp';
import Avatar from './Avatar';

type Props = {
  user: User;
  onSelect: (id: number) => void;
  selected: boolean;
  className?: string;
};

export default function UserCard({ user, onSelect, selected }: Props) {
  return (
    <div
      className={`h-full rounded-2xl w-full bg-[#33373f] flex justify-start items-center gap-4 pl-4  relative overflow-hidden`}
    >
      <Avatar user={user} className='w-24 h-24 rounded-lg overflow-hidden flex-0'></Avatar>
      <section className='text-xl text-white flex-1'>
        <section className='flex items-center mb-5 mt-2'>
          <span className='text-xl overflow-hidden whitespace-nowrap text-ellipsis'>{user.name}</span>
          <span className={`${user.gender ? 'text-blue-400' : 'text-red-400'} h-8 ml-4`}>
            {user.gender ? <MaleSharpIcon /> : <FemaleSharpIcon />}
          </span>
        </section>
        <section className='text-xs text-gray-400  h-8 line-clamp-2'>
          {user.desc || 'This user is lazy and writes nothing'}
        </section>
      </section>
      <span
        className='w-10 flex justify-center items-center cursor-pointer transition-all bg-[#9c27b0] h-full text-white text-sm active:bg-white active:text-[#9c27b0] hover:scale-125'
        onClick={() => onSelect(user.id)}
      >
        {/* <Checkbox checked={selected}></Checkbox> */}
        {/* <IconButton aria-label='delete' size='large'> */}
        <MapsUgcSharpIcon />
        {/* </IconButton> */}
      </span>
    </div>
  );
}
