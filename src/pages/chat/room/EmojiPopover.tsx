import React, { useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from '@mui/material';

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onEmojiSelect: (emojiObj: any) => void;
  onClose: () => void;
};

export default function EmojiPopover({ open, anchorEl, onEmojiSelect, onClose }: Props) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <section className='w-[340px]'>
        <Picker data={data} theme='dark' onEmojiSelect={onEmojiSelect} onClickOutside={onClose} />
      </section>
    </Popover>
  );
}
