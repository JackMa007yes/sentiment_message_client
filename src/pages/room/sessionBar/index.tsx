import { memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { GetSessionList, GetUserList } from '@/api';
import SessionList from './SessionList';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddUserModal from '@/components/AddUserModal';
import CustomTextField from '@/components/ui/CustomTextFiled';

type Props = {
  current: Session | null;
  updatedSession: Record<string, SessionBase>;
  onSelect: (selected: Session) => void;
};
function SessionBar({ current, onSelect, updatedSession }: Props) {
  const [searchWord, setSearchWord] = useState('');
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const [filterSessionList, setFilterSessionList] = useState<Session[]>([]);

  const { refetch } = useQuery(['GetSessionList'], () => GetSessionList(), {
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

  const debouncedHandleInput = () => {
    // TODO
  };

  useEffect(() => {
    setFilterSessionList(sessionList.filter(session => session.toUser.name.includes(searchWord)));
  }, [searchWord, sessionList]);

  useEffect(() => {
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
    setSessionList(newSessionList);
  }, [updatedSession]);

  return (
    <div className='text-white w-[440px] h-screen p-10'>
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
        onChange={debouncedHandleInput}
        inputProps={{
          style: {
            height: '28px'
          }
        }}
      />
      <SessionList
        data={filterSessionList}
        current={current}
        onSelect={session => {
          checkMessage(session);
          onSelect(session);
        }}
      />
    </div>
  );
}

export default memo(SessionBar);
