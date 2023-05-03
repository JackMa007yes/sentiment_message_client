import { memo, useState } from 'react';
import Search from './Search';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import AddUserModal from '@/components/AddUserModal';

type Props = {
  onInput: (word: string) => void;
  onAdd: () => void;
};

function TopBar({ onInput, onAdd }: Props) {
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleAdd = () => {
    onAdd();
    setModalDisplay(false);
  };

  return (
    <div className='flex gap-4'>
      <Search onInput={onInput} />
      <IconButton aria-label='delete' size='large' onClick={() => setModalDisplay(true)}>
        <AddCircle color='secondary' fontSize='large' />
      </IconButton>
      <AddUserModal open={modalDisplay} onClose={() => setModalDisplay(false)} onAdd={handleAdd} />
    </div>
  );
}

export default memo(TopBar);
