import { useIsPC } from '@/hooks/useIsPC';
import React from 'react';

type TextMessageProps = {
  msg: IMessage;
  simple?: boolean;
};

export default function TextMsg({ msg, simple = false }: TextMessageProps) {
  const isPC = useIsPC();
  /**
   * 处理信息中的换行符
   */
  const handleLine = (current: string) => {
    const lines = current.split(/\r?\n/);

    return (
      <div className={`${simple ? '' : isPC ? 'px-4 py-3' : 'py-2 px-3'} leading-7`}>
        {lines.map((line, index, arr) => {
          return (
            <React.Fragment key={`${msg.id}-${index}`}>
              <span>{line}</span>
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return handleLine(msg.message);
}
