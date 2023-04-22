import { TextField } from '@mui/material';
import { memo } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  send: (val: string) => void;
};
function Input({ value, onChange, send }: Props) {
  return (
    <div className='relative'>
      <input
        id='fullWidth'
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder='send you message'
        onKeyPress={e => {
          if (e.key === 'Enter') {
            send(e.target.value);
          }
        }}
        className='h-18 text-lg bg-[#2e343d] w-full rounded-3xl border-none text-white p-6 hover:border-none focus:border-none '
      />
    </div>
  );
}

export default memo(Input);
