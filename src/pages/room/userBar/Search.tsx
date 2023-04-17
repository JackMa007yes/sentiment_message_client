import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { memo } from 'react';

type Props = {
  onInput: (val: string) => void;
};

const Search = ({ onInput }: Props) => {
  const handleInput = (e: any) => {
    onInput?.(e.target.value);
  };
  return (
    <div className='w-full relative pl-4'>
      <input
        placeholder='Search'
        className='w-full h-14 p-5 pl-16 text-xl bg-[#2e343d] text-[#71757c] border-[#71757c] rounded-2xl'
        onInput={handleInput}
      ></input>
      <SearchOutlinedIcon style={{ fontSize: '30px', color: '#71757c' }} className='absolute left-8 top-3' />
    </div>
  );
};

export default memo(Search);
