import { memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import { GetSessionList } from '@/api';
import { useStore } from '@/store';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '@/components/ui/CustomTextFiled';
import SessionList from './SessionList';

type Props = {
  updatedSession: Record<string, SessionBase>;
};
function SessionBar({ updatedSession }: Props) {
  const { session, sessionList, setSession, setSessionList } = useStore(state => state);
  const [searchWord, setSearchWord] = useState('');
  const [filterSessionList, setFilterSessionList] = useState<Session[]>([]);

  useQuery(['GetSessionList'], () => GetSessionList(), {
    initialData: [],
    onSuccess(data) {
      const res = data.sort(
        (pre, cur) =>
          new Date(cur.lastMessageTime || cur.createTime).getTime() -
          new Date(pre.lastMessageTime || pre.createTime).getTime()
      );
      setSessionList(res);
    }
  });

  const checkMessage = (session: Session) => {
    const newSessionList = sessionList.map(item => {
      return item.id === session.id ? { ...item, unreadCount: 0 } : item;
    });
    setSessionList(newSessionList);
  };

  const mergeSessionList = (updatedSession: Record<string, SessionBase>) => {
    const newSessionList = sessionList.map(session => {
      const newSession = updatedSession[session.id];
      if (newSession) {
        return {
          ...session,
          ...newSession
        };
      } else {
        return session;
      }
    });
    return newSessionList;
  };

  const debouncedHandleInput = debounce(setSearchWord, 300);

  useEffect(() => {
    setFilterSessionList(
      sessionList.filter(session => session.toUser.name.toLowerCase().includes(searchWord.trim().toLowerCase()))
    );
  }, [searchWord, sessionList]);

  useEffect(() => {
    setSessionList(mergeSessionList(updatedSession));
  }, [updatedSession]);

  return (
    <div className='text-white w-[400px] h-screen py-10 px-8'>
      <CustomTextField
        fullWidth
        placeholder='Search User'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: 'gray' }} />
            </InputAdornment>
          )
        }}
        onChange={(e: any) => debouncedHandleInput(e.target.value)}
        inputProps={{
          style: {
            height: '28px'
          }
        }}
      />
      <SessionList
        data={filterSessionList}
        current={session}
        onSelect={session => {
          checkMessage(session);
          setSession(session);
        }}
      />
    </div>
  );
}

export default memo(SessionBar);
