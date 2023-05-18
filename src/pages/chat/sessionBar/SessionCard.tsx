import { memo } from 'react';
import { format } from 'date-fns';
import { Badge } from '@mui/material';
import Avatar from '@/components/ui/Avatar';
import FormatedMsg from '@/components/ui/FormatedMsg';

type Props = {
  data: Session;
  selected: boolean;
  onSelect: (selected: Session) => void;
};
function SessionCard({ data, selected, onSelect }: Props) {
  const formatDate = (date: string) => {
    const timestamp = new Date(date).getTime();
    const localTimestamp = timestamp + 1000 * 60 * 60 * 8;
    const now = new Date().getTime();
    if (now - localTimestamp > 1000 * 60 * 60 * 24 * 3) {
      return '3 days ago';
    } else if (now - localTimestamp > 1000 * 60 * 60 * 24 * 1) {
      return '1 days ago';
    } else {
      return format(new Date(localTimestamp), 'HH:mm');
    }
  };

  return (
    <div
      className={`p-4 ${
        selected ? 'bg-[#1a1e23]' : null
      } rounded-[24px] h-30 mb-2 flex gap-2 cursor-pointer hover:bg-[#1a1e23] overflow-hidden`}
      onClick={() => onSelect(data)}
    >
      <section className='w-14 flex-0'>
        <Badge
          badgeContent={data.unreadCount}
          max={99}
          overlap='circular'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          color='error'
        >
          <Avatar user={data.toUser} className='w-14 h-14 rounded-[50%] overflow-hidden' />
        </Badge>
      </section>
      <section className='flex-1 p-1 ml-4'>
        <section className='mb-1 flex justify-between items-center'>
          <span className='text-lg'>{data.toUser.name}</span>
          <span className='text-xs text-primary-text'>{formatDate(data.lastMessageTime)}</span>
        </section>
        <section className='text-primary-text text-xs flex justify-between items-center '>
          <span className='overflow-hidden line-clamp-1 w-40'>
            <FormatedMsg msg={data.lastMessage} id={data.id}></FormatedMsg>
          </span>
        </section>
      </section>
    </div>
  );
}

export default memo(SessionCard);
