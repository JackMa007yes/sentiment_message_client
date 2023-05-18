import { memo, useRef, useState } from 'react';
import CustomTextField from '@/components/ui/CustomTextFiled';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { IconButton } from '@mui/material';
import EmojiPopover from './EmojiPopover';

type Props = {
  onSend: (val: string) => void;
};
function Input({ onSend }: Props) {
  const [message, setMessage] = useState('');
  const [emojiPopoverDisplay, setEmojiPopoverDisplay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorElRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setEmojiPopoverDisplay(true);
  };

  const handleEmojiSelect = (emojiObj: any) => {
    const inputEl = inputRef.current;
    if (inputEl) {
      const tokenArr = message.split('');
      tokenArr.splice(inputRef.current?.selectionStart || tokenArr.length, 0, emojiObj.native);
    } else {
      // Noop
    }
  };

  const handleSend = () => {
    if (!message) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className='py-0 px-4 relative'>
      <CustomTextField
        fullWidth
        placeholder='Send your message'
        value={message}
        multiline
        maxRows={4}
        minRows={3}
        onChange={(e: any) => setMessage(e.target.value)}
        onKeyPress={(e: KeyboardEvent) => {
          const { shiftKey, key } = e;
          const isEnter = key === 'Enter';
          /** 不改变message值 */
          const notChangeMsg = () => e.preventDefault();

          if (shiftKey && isEnter) {
            // shift + enter 输入换行
            setMessage(message + '\n');
            notChangeMsg();
          } else if (isEnter) {
            handleSend();
            notChangeMsg();
          }
        }}
        autoFocus
        inputRef={inputRef}
        InputProps={{ style: { paddingRight: '50px' } }}
      ></CustomTextField>
      <section className='absolute right-5 top-1' ref={anchorElRef}>
        <EmojiPopover
          open={emojiPopoverDisplay}
          anchorEl={anchorElRef.current}
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setEmojiPopoverDisplay(false)}
        />
        <IconButton color='primary' onClick={handleClick}>
          <SentimentSatisfiedOutlinedIcon sx={{ marginTop: '-2px' }} fontSize='large' />
        </IconButton>
      </section>
    </div>
  );
}

export default memo(Input);
