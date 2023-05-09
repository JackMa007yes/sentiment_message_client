import { useStore } from '@/store';
import Avatar from '@/components/ui/Avatar';

type Props = {
  data: IMessage;
  user?: User;
};

export default function MessagePopup({ data, user }: Props) {
  const profile = useStore(state => state.profile);
  return (
    <div className={`mb-6 flex justify-end ${data.userId === profile?.id ? '' : 'flex-row-reverse'}`}>
      <section
        className={`text-white px-4 py-3 leading-8 rounded-2xl max-w-[52%] break-words ${
          data.userId === profile?.id ? 'bg-[#b785f5]' : 'bg-[#2e343d]'
        }`}
      >
        {data.message}
      </section>
      <Avatar
        user={user || null}
        className={`w-12 h-12 rounded-[50%] overflow-hidden ${data.userId === profile?.id ? 'ml-4' : 'mr-4'}`}
      ></Avatar>
    </div>
  );
}
