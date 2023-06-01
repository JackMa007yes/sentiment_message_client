import { useIsPC } from '@/hooks/useIsPC';
import SessionCard from './SessionCard';

type Props = {
  data: Session[];
  current: Session | null;
  onSelect: (selected: Session) => void;
};
export default function SessionList({ data, current, onSelect }: Props) {
  const isPC = useIsPC();

  const handleSelect = (session: Session) => {
    if (session.id !== current?.id) onSelect(session);
  };

  return (
    <div className={`py-6 overflow-auto scroll-smooth scroll-p-0 ${isPC ? '' : 'h-[calc(100dvh-90px)] pb-20'}`}>
      {data.map(item => {
        return <SessionCard key={item.id} data={item} selected={current?.id === item.id} onSelect={handleSelect} />;
      })}
    </div>
  );
}
