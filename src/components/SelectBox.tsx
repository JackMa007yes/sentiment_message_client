import { getBase64 } from '@/utils/avatar';
import React from 'react';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import MapsUgcSharpIcon from '@mui/icons-material/MapsUgcSharp';

type Props = {
  user: UserListItem;
  onSelect: (id: number) => void;
  selected: boolean;
  className?: string;
};

export default function SelectBox({ user, onSelect, selected }: Props) {
  return (
    <div
      className={`h-28 rounded-2xl w-[300px] bg-[#33373f] flex justify-start items-center gap-4 pl-4  relative overflow-hidden`}
    >
      <section className='w-20 h-20 overflow-hidden rounded-lg flex-shrink-0'>
        {user?.avatar?.data.length ? (
          <img src={getBase64(user.avatar.data)} alt='' className='min-w-full min-h-full'></img>
        ) : (
          <section />
        )}
      </section>
      <section className='text-xl text-white'>
        <section className='flex items-center mb-3'>
          <span className='text-xl w-24 overflow-hidden whitespace-nowrap text-ellipsis'>{user.name}</span>
          <span className={`${user.gender ? 'text-blue-400' : 'text-red-400'} h-8 ml-4`}>
            {user.gender ? <MaleSharpIcon /> : <FemaleSharpIcon />}
          </span>
        </section>
        <section className='text-xs text-gray-400 w-28  h-10 line-clamp-2'>
          {user.desc || '这个用户很懒，什么都没有写'}
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
