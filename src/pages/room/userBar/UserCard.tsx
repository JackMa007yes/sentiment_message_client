import { getBase64 } from '@/utils/avatar';

const Avatar = ({ data }: { data: Profile }) => {
  return (
    <div className={`rounded-2xl w-16 h-16 text-3xl flex justify-center items-center overflow-hidden border`}>
      {data.avatar?.data.length ? (
        <img src={getBase64(data.avatar.data)}></img>
      ) : (
        <span>{data.name.split('')[0].toUpperCase()}</span>
      )}
    </div>
  );
};

type Props = {
  data: UserListItem;
  selected: boolean;
  onSelect: (selected: UserListItem) => void;
};
export default function UserCard({ data, selected, onSelect }: Props) {
  return (
    <div
      className={`p-4 ${selected ? 'bg-[#2e343d]' : null} rounded-[24px] mb-4 flex  gay-4 cursor-pointer`}
      onClick={() => onSelect(data)}
    >
      <Avatar data={data} />
      <section className='flex-1 p-1 ml-4'>
        <section className='mb-3 text-xl'>{data.name}</section>
        <section className='text-gray-500 text-xs'>暂无新信息</section>
      </section>
    </div>
  );
}
