const Avatar = ({ name }: { name: string }) => {
  const colorList = [
    'bg-violet-800',
    'bg-gray-400',
    'bg-red-500',
    'bg-orange-600',
    'bg-amber-500',
    'bg-yellow-400',
    'bg-lime-600',
    'bg-green-500',
    'bg-emerald-800'
  ];
  return (
    <div
      className={`rounded-2xl ${
        colorList[Math.floor(Math.random() * 9)]
      } w-16 h-16 text-3xl flex justify-center items-center`}
    >
      <span>{name.split('')[0].toUpperCase()}</span>
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
      <Avatar name={data.name} />
      <section className='flex-1 p-1 ml-4'>
        <section className='mb-3 text-xl'>{data.name}</section>
        <section className='text-gray-500 text-xs'>暂无新信息</section>
      </section>
    </div>
  );
}
