import { memo, useRef, useState } from 'react';
import Upload from 'rc-upload';
import { useSnackbar } from 'notistack';
import { getToken } from '@/api/http';
import emojiIcon from '@/assets/icon/emoji.svg';
import imageIcon from '@/assets/icon/image.svg';
import { IconButton } from '@mui/material';
import CustomTextField from '@/components/ui/CustomTextFiled';
import EmojiPopover from './EmojiPopover';
import { MessageType } from '@/constants';

type Props = {
  onSend: (message: { val: string; type: MessageType }) => void;
};
function Input({ onSend }: Props) {
  const [message, setMessage] = useState('');
  const [emojiPopoverDisplay, setEmojiPopoverDisplay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorElRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const props = {
    action: '/api/room/message/image',
    headers: {
      authorization: (() => {
        return getToken();
      })()
    },
    multiple: false,
    beforeUpload,
    onSuccess(response: any) {
      onSend({
        type: MessageType.IMAGE,
        val: response.Location
      });
    },
    onError(err: any, info: any) {
      enqueueSnackbar(info.message, { variant: 'error' });
    }
  };

  function beforeUpload(file: any) {
    const typeIsAvailable = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';

    if (!typeIsAvailable) {
      enqueueSnackbar('The picture must be in JPG/JPEG/PNG format', { variant: 'error' });
    }

    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isLt10M) {
      enqueueSnackbar('The image must be smaller than 2m', { variant: 'error' });
    }

    return typeIsAvailable && isLt10M;
  }

  const handleClick = (e: any) => {
    e.stopPropagation();
    setEmojiPopoverDisplay(true);
  };

  const handleEmojiSelect = (emojiObj: any) => {
    const inputEl = inputRef.current;
    if (inputEl) {
      const tokenArr = message.split('');
      const start = inputEl.selectionStart || tokenArr.length;
      tokenArr.splice(start, 0, emojiObj.native);
      setMessage(tokenArr.join(''));
      setTimeout(() => {
        inputEl.selectionStart = start + emojiObj.native.length;
      }, 0);
    } else {
      // Noop
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend({
      type: MessageType.TEXT,
      val: message
    });
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
        InputProps={{ style: { paddingRight: '100px' } }}
      ></CustomTextField>
      <section className='absolute right-6 top-1' ref={anchorElRef}>
        <EmojiPopover
          open={emojiPopoverDisplay}
          anchorEl={anchorElRef.current}
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setEmojiPopoverDisplay(false)}
        />
        <IconButton color='primary' onClick={handleClick}>
          <img src={emojiIcon} alt='' className='w-7'></img>
        </IconButton>
        <Upload {...props}>
          <IconButton color='primary'>
            <img src={imageIcon} alt='' className='w-7'></img>
          </IconButton>
        </Upload>
      </section>
    </div>
  );
}

export default memo(Input);
