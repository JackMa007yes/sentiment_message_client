import { useStore } from '@/store';
import Avatar from '@/components/ui/Avatar';
import FormatedMsg from '@/components/ui/formatedMsg';

type Props = {
  data: IMessage;
  user?: User;
};

export default function MessagePopup({ data, user }: Props) {
  const profile = useStore(state => state.profile);

  const isSelf = data.userId === profile?.id;

  return (
    <div className={`mb-6 flex justify-end ${isSelf ? '' : 'flex-row-reverse'}`}>
      <section
        className={`text-white leading-8 rounded-2xl max-w-[52%] break-words ${
          isSelf ? 'bg-[#b785f5]' : 'bg-[#2e343d]'
        }`}
      >
        {data ? <FormatedMsg msg={data} /> : null}
      </section>
      <Avatar
        user={user || null}
        className={`w-12 h-12 rounded-[50%] overflow-hidden ${isSelf ? 'ml-4' : 'mr-4'}`}
      ></Avatar>
    </div>
  );
}
