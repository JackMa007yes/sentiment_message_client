import SessionCard from './SessionCard';

type Props = {
  data: Session[];
  current: Session | null;
  onSelect: (selected: Session) => void;
};
export default function SessionList({ data, current, onSelect }: Props) {
  const handleSelect = (session: Session) => {
    if (session.id !== current?.id) onSelect(session);
  };

  return (
    <div className='py-6 overflow-auto scroll-smooth scroll-p-0 h-[800px]'>
      {data.map(item => {
        return <SessionCard key={item.id} data={item} selected={current?.id === item.id} onSelect={handleSelect} />;
      })}
    </div>
  );
}
