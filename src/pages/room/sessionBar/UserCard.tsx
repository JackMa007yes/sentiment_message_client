import { getBase64 } from '@/utils/avatar';
import { format } from 'date-fns';

const Avatar = ({ data }: { data: Profile }) => {
  return (
    <div
      className={`rounded-2xl w-14 h-14 text-2xl bg-primary-color flex justify-center items-center overflow-hidden border`}
    >
      {data.avatar?.data.length ? (
        <img src={getBase64(data.avatar.data)}></img>
      ) : (
        <span>{data.name.split('')[0].toUpperCase()}</span>
      )}
    </div>
  );
};

type Props = {
  data: Session;
  selected: boolean;
  onSelect: (selected: Session) => void;
};
export default function UserCard({ data, selected, onSelect }: Props) {
  const formatCount = (count: number) => {
    return count > 99 ? '99+' : count;
  };

  return (
    <div
      className={`p-4 ${selected ? 'bg-[#2e343d]' : null} rounded-[24px] mb-2 flex gap-2 cursor-pointer`}
      onClick={() => onSelect(data)}
    >
      <Avatar data={data.toUser} />
      <section className='flex-1 p-1 ml-4'>
        <section className='mb-1 flex justify-between items-center'>
          <span className='text-lg'>{data.toUser.name}</span>
          <span className='text-xs text-primary-text'>{format(new Date(data.lastMessageTime), 'hh:mm')}</span>
        </section>
        <section className='text-primary-text text-xs text-ellipsis flex justify-between items-center'>
          <span>{data.lastMessage || 'let go out'}</span>
          {!data.unreadCount ? (
            <span className='flex justify-center items-center rounded-full bg-primary-color p-2 h-5 text-white'>
              {formatCount(data.unreadCount || 999)}
            </span>
          ) : null}
        </section>
      </section>
    </div>
  );
}
