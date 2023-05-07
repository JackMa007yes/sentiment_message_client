import CustomTextField from '@/components/ui/CustomTextFiled';
import { memo } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  send: (val: string) => void;
};
function Input({ value, onChange, send }: Props) {
  return (
    <div className='relative mx-4'>
      <input
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder='send you message'
        onKeyPress={(e: any) => {
          if (e.key === 'Enter') {
            send(e.target.value);
          }
        }}
        className='h-14 text-lg bg-[#16171b] w-full rounded-2xl border-none text-white p-6 hover:border-none focus:border-none '
      />
    </div>
  );
  return (
    <div className='py-0 px-8'>
      <CustomTextField
        fullWidth
        placeholder='Send your message'
        InputProps={{
          style: {
            height: '32px'
          }
          // endAdornment: (
          //   <InputAdornment position='end'>
          //     <IconButton aria-label='toggle password visibility' onClick={console.log} edge='end'>
          //       <SendIcon />
          //     </IconButton>
          //   </InputAdornment>
          // )
        }}
      ></CustomTextField>
      {/* <OutlinedInput
        id='outlined-adornment-password'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      /> */}
    </div>
  );
}

export default memo(Input);
