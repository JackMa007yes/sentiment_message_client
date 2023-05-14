import React, { memo } from 'react';
import Avatar from '@/components/ui/Avatar';
import { useStore } from '@/store';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import emojiHiddenIcon from '@/assets/icon/close_eye.svg';
import emojiIcon from '@/assets/icon/happy.svg';

type Props = {
  memoji: {
    open: boolean;
    onToggle: (state: boolean) => void;
  };
  moreClick: () => void;
};

const TopBar = ({ memoji, moreClick }: Props) => {
  const { session } = useStore(state => state);

  return (
    <div className='text-white text-xl h-20 font-bold px-8 flex items-center justify-between bg-[#16171b]'>
      <span className='flex justify-start items-center gap-4'>
        <Avatar
          user={session?.toUser || null}
          className='w-12 g-12 rounded-[50%] overflow-hidden inline-block'
        ></Avatar>
        {session?.toUser.name}
      </span>
      <span className=''>
        <IconButton>
          <MoreHoriz />
        </IconButton>
        <IconButton onClick={() => memoji.onToggle(!memoji.open)}>
          {memoji.open ? (
            <img src={emojiIcon} className='w-7' alt=''></img>
          ) : (
            <img src={emojiHiddenIcon} className='w-7' alt=''></img>
          )}
        </IconButton>
      </span>
    </div>
  );
};

export default memo(TopBar);
