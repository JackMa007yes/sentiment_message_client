import React, { memo } from 'react';
import Avatar from '@/components/ui/Avatar';
import { useStore } from '@/store';
import { MoreHoriz } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import emojiHiddenIcon from '@/assets/icon/close_eye.svg';
import emojiIcon from '@/assets/icon/happy.svg';
import { useIsPC } from '@/hooks/useIsPC';
import { ClientToServerEventsEnum } from '@/constants';

const WrapperClassMap = {
  PC: 'text-white text-xl h-20 font-bold px-8 flex items-center justify-between bg-[#16171b]',
  mobile: 'text-white text-xl py-3 px-4 flex items-center justify-between bg-[#16171b]'
};

const AvatarClassMap = {
  PC: 'w-12 h-12 rounded-[50%] overflow-hidden inline-block',
  mobile: 'w-10 h-10 rounded-[50%] overflow-hidden inline-block'
};

type Props = {
  memoji: {
    open: boolean;
    onToggle: (state: boolean) => void;
  };
  moreClick: () => void;
};

const TopBar = ({ memoji, moreClick }: Props) => {
  const { client, session, setSession } = useStore(state => state);
  const isPC = useIsPC();

  const handleBack = () => {
    if (client?.connected && session) {
      client?.emit(ClientToServerEventsEnum.LEAVE_ROOM, { roomId: session.room.id });
    }
    setSession(null);
  };

  return (
    <div className={isPC ? WrapperClassMap.PC : WrapperClassMap.mobile}>
      <span className='flex justify-start items-center gap-3'>
        {isPC ? null : (
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Avatar user={session?.toUser || null} className={isPC ? AvatarClassMap.PC : AvatarClassMap.mobile}></Avatar>
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
