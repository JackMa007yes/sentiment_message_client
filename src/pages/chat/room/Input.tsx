import CustomTextField from '@/components/ui/CustomTextFiled';
import { ArrowCircleRightRounded, ArrowUpwardOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { memo } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  send: (val: string) => void;
};
function Input({ value, onChange, send }: Props) {
  return (
    <div className='py-0 px-4 relative'>
      <CustomTextField
        fullWidth
        placeholder='Send your message'
        value={value}
        multiline
        maxRows={4}
        minRows={3}
        onChange={(e: any) => onChange(e.target.value)}
        onKeyPress={(e: any) => {
          if (e.key === 'Enter') {
            send(e.target.value);
          }
        }}
        autoFocus
        InputProps={{ style: { paddingRight: '50px' } }}
      ></CustomTextField>
      <section className='absolute right-5 top-1'>
        <IconButton color='primary' aria-label='add an alarm'>
          <ArrowCircleRightRounded sx={{ transform: 'rotate(-90deg)', marginTop: '-2px' }} fontSize='large' />
        </IconButton>
      </section>
    </div>
  );
}

export default memo(Input);
