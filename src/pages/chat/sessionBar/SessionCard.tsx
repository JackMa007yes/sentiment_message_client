import { memo } from 'react';
import { format } from 'date-fns';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@mui/material';

type Props = {
  data: Session;
  selected: boolean;
  onSelect: (selected: Session) => void;
};
function SessionCard({ data, selected, onSelect }: Props) {
  return (
    <div
      className={`p-4 ${
        selected ? 'bg-[#1a1e23]' : null
      } rounded-[24px] h-30 mb-2 flex gap-2 cursor-pointer hover:bg-[#1a1e23] overflow-hidden`}
      onClick={() => onSelect(data)}
    >
      <section className='w-14 flex-0'>
        <Avatar user={data.toUser} className='w-14 h-14 rounded-xl overflow-hidden' />
      </section>
      <section className='flex-1 p-1 ml-4'>
        <section className='mb-1 flex justify-between items-center'>
          <span className='text-lg'>{data.toUser.name}</span>
          <span className='text-xs text-primary-text'>{format(new Date(data.lastMessageTime), 'hh:mm')}</span>
        </section>
        <section className='text-primary-text text-xs flex justify-between items-center '>
          <span className='overflow-hidden whitespace-nowrap text-ellipsis w-40'>{data.lastMessage || ''}</span>
          {data.unreadCount ? (
            <Badge badgeContent={data.unreadCount} max={99} color='primary' sx={{ mr: 1 }}></Badge>
          ) : null}
        </section>
      </section>
    </div>
  );
}

export default memo(SessionCard);
