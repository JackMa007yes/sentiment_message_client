import { useStore } from '@/store';
import { useRef } from 'react';
import Viewer from 'viewerjs';
import Avatar from '@/components/ui/Avatar';
import { MessageType } from '@/constants';
import { getImageUrl } from '@/utils/image';
import FormatedMessage from '@/components/ui/FormatedMsg';

type Props = {
  data: IMessage;
  user?: User;
};

export default function MessagePopup({ data, user }: Props) {
  const profile = useStore(state => state.profile);
  const viewInstanceRef = useRef<any>(null);

  const isSelf = data.userId === profile?.id;

  const viewImage = (id: string) => {
    const El = document.getElementById(id);
    if (El) {
      viewInstanceRef.current = new Viewer(El);
    }
  };

  return (
    <div className={`mb-6 flex justify-end ${data.userId === profile?.id ? '' : 'flex-row-reverse'}`}>
      <section
        className={`text-white leading-8 rounded-2xl max-w-[52%] break-words ${
          isSelf ? 'bg-[#b785f5]' : 'bg-[#2e343d]'
        }`}
      >
        {data.type === MessageType.TEXT ? (
          <section className='px-4 py-3'>
            <FormatedMessage msg={data.message} id={data.id}></FormatedMessage>
          </section>
        ) : (
          <img
            src={getImageUrl(data.imageUrl)}
            id={'message_image_' + data.id}
            alt=''
            className='max-h-64 cursor-pointer rounded-2xl'
            onClick={() => viewImage('message_image_' + data.id)}
          ></img>
        )}
      </section>
      <Avatar
        user={user || null}
        className={`w-12 h-12 rounded-[50%] overflow-hidden ${isSelf ? 'ml-4' : 'mr-4'}`}
      ></Avatar>
    </div>
  );
}
