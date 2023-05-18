import React from 'react';

type FormatedMsgProps = {
  id: number;
  msg: string;
};

/**
 * 信息展示处理
 */
export default function FormatedMessage({ id, msg }: FormatedMsgProps) {
  /**
   * 处理信息中的换行符
   */
  const handleLine = (current: string) => {
    const lines = current.split(/\r?\n/);

    return (
      <>
        {lines.map((line, index, arr) => {
          return (
            <React.Fragment key={`${id}-${index}`}>
              <span>{line}</span>
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return handleLine(msg);
}
