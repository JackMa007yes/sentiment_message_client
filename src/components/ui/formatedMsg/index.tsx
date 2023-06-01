import { MessageType } from '@/constants';
import TextMsg from './TextMsg';
import ImgMsg from './ImgMsg';

type FormatedMsgProps = {
  msg: IMessage;
  simple?: boolean;
};

/**
 * 信息展示处理
 */
export default function FormatedMsg({ msg, simple = false }: FormatedMsgProps) {
  switch (msg.type) {
    case MessageType.TEXT:
      return <TextMsg msg={msg} simple={simple} />;
    case MessageType.IMAGE:
      return <ImgMsg msg={msg} simple={simple} />;
    default:
      return <></>;
  }
}
