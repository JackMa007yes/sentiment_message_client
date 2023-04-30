import React from 'react';
import Search from './Search';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

type Props = {
  onInput: (word: string) => void;
  onAdd: () => void;
};

export default function TopBar({ onInput, onAdd }: Props) {
  return (
    <div className='flex gap-4'>
      <Search onInput={onInput} />
      <IconButton aria-label='delete' size='large' onClick={() => onAdd()}>
        <AddCircle color='secondary' fontSize='large' />
      </IconButton>
    </div>
  );
}
