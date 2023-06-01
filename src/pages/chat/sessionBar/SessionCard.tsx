import { memo } from 'react';
import { format } from 'date-fns';
import { Badge } from '@mui/material';
import Avatar from '@/components/ui/Avatar';
import FormatedMsg from '@/components/ui/formatedMsg';
import { useIsPC } from '@/hooks/useIsPC';

type Props = {
  data: Session;
  selected: boolean;
  onSelect: (selected: Session) => void;
};
function SessionCard({ data, selected, onSelect }: Props) {
  const isPC = useIsPC();

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
      className={`p-4 ${selected ? 'bg-[#1a1e23]' : null} ${
        isPC ? 'h-30 hover:bg-[#1a1e23]' : ' h-20'
      } rounded-[24px]  mb-2 flex gap-2 cursor-pointer overflow-hidden`}
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
          color={isPC ? 'error' : 'primary'}
        >
          <Avatar user={data.toUser} className={`rounded-[50%] overflow-hidden ${isPC ? 'w-14 h-14' : 'w-12 h-12'}`} />
        </Badge>
      </section>
      <section className={`flex-1 p-1 ${isPC ? 'ml-4' : ''}`}>
        <section className='mb-1 flex justify-between items-center'>
          <span className={`${isPC ? 'text-lg' : ''}`}>{data.toUser.name}</span>
          <span className='text-xs text-primary-text'>{formatDate(data.lastMessageTime)}</span>
        </section>
        <section className='text-primary-text text-xs flex justify-between items-center '>
          <span className='overflow-hidden line-clamp-1 w-40'>
            {data.lastMessage ? <FormatedMsg msg={data.lastMessage} simple></FormatedMsg> : ''}
          </span>
        </section>
      </section>
    </div>
  );
}

export default memo(SessionCard);
