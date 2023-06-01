import Viewer from 'viewerjs';
import { useRef } from 'react';
import { getImageUrl } from '@/utils/image';

type Props = {
  msg: IMessage;
  simple?: boolean;
};
export default function ImgMsg({ msg, simple = false }: Props) {
  const viewInstanceRef = useRef<any>(null);

  const viewImage = (id: string) => {
    const El = document.getElementById(id);
    if (El) {
      viewInstanceRef.current = new Viewer(El);
    }
  };

  return simple ? (
    <span>[image]</span>
  ) : (
    <img
      src={getImageUrl(msg.imageUrl)}
      id={'message_image_' + msg.id}
      alt=''
      className='max-h-64 cursor-pointer rounded-2xl'
      onClick={() => viewImage('message_image_' + msg.id)}
    ></img>
  );
}
