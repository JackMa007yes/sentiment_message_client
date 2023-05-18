import { useStore } from '@/store';
import Avatar from '@/components/ui/Avatar';
import FormatedMsg from '@/components/layout/FormatedMsg';

type Props = {
  data: IMessage;
  user?: User;
};

export default function MessagePopup({ data, user }: Props) {
  const profile = useStore(state => state.profile);
  /** 是否是用户自己 */
  const isSelf = data.userId === profile?.id;

  return (
    <div className={`mb-6 flex justify-end ${isSelf ? '' : 'flex-row-reverse'}`}>
      <section
        className={`text-white px-4 py-3 leading-8 rounded-2xl max-w-[52%] break-words ${
          isSelf ? 'bg-[#b785f5]' : 'bg-[#2e343d]'
        }`}
      >
        <FormatedMsg msg={data.message} id={data.id}></FormatedMsg>
      </section>
      <Avatar
        user={user || null}
        className={`w-12 h-12 rounded-[50%] overflow-hidden ${isSelf ? 'ml-4' : 'mr-4'}`}
      ></Avatar>
    </div>
  );
}
