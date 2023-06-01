import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import { useSnackbar } from 'notistack';
import { Pagination, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useStore } from '@/store';
import { RoomType } from '@/constants/common';
import CustomTextField from '@/components/ui/CustomTextFiled';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { CreateRoom, GetSessionList, GetUserList } from '@/api';
import UserCard from './UserCard';
import { useIsPC } from '@/hooks/useIsPC';

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          li: {
            button: {
              color: '#FFF'
            }
          }
        }
      }
    }
  }
});

export default function index() {
  const { profile, sessionList, setSessionList, setUpdatedSessionMap } = useStore(state => state);
  const { enqueueSnackbar } = useSnackbar();

  const [limit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<User[]>([]);

  const isPC = useIsPC();

  const { refetch } = useQuery(['GetSessionList'], () => GetSessionList(), {
    initialData: [],
    onSuccess(data) {
      const res = data.sort(
        (pre, cur) =>
          new Date(cur.lastMessageTime || cur.createTime).getTime() -
          new Date(pre.lastMessageTime || pre.createTime).getTime()
      );
      setUpdatedSessionMap({});
      setSessionList(res);
    }
  });

  const { mutate: createRoomMutate } = useMutation(['CreateRoom'], (data: CreateRoomParams) => CreateRoom(data), {
    onSuccess: () => {
      enqueueSnackbar('Add new user successfully!', { variant: 'success' });
      refetch();
    }
  });

  const handleSelected = useCallback(
    (selectedUserId: number) => {
      if (!profile) return;
      createRoomMutate({ type: RoomType.PERSONAL, users: [selectedUserId, profile.id] });
    },
    [profile]
  );

  const handleInput = (e: any) => {
    setKeyword(e.target.value);
  };
  const debouncedHandleInput = debounce(handleInput, 300);

  useQuery(['GetUserList', limit, page, keyword], () => GetUserList({ limit, page, keyword }), {
    onSuccess: data => {
      setUserList(data.data);
      setTotal(data.total);
    }
  });

  return (
    <div className={`bg-primary-bg h-full flex flex-col ${isPC ? 'p-8' : 'overflow-auto p-4 pb-20'}`}>
      <section className='flex justify-center my-14 flex-0'>
        <section className={`${isPC ? 'w-1/2' : 'w-full'}`}>
          <CustomTextField
            fullWidth
            placeholder=' Search User'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'gray' }} />
                </InputAdornment>
              )
            }}
            onChange={debouncedHandleInput}
          />
        </section>
      </section>

      <section className='flex-1'>
        <section className={`flex flex-wrap ${isPC ? 'gap-6' : 'gap-2'} `}>
          {userList.map(item => {
            return (
              <section className={` ${isPC ? 'h-32 w-[calc(25%-20px)]' : 'w-full'}`} key={item.id}>
                <UserCard
                  user={item}
                  onSelect={handleSelected}
                  disabled={sessionList.some(session => session.toUser.id === item.id) || profile?.id === item.id}
                />
              </section>
            );
          })}
        </section>
      </section>

      <section className='text-white flex justify-center flex-0 mt-3'>
        <ThemeProvider theme={theme}>
          <Pagination
            count={Math.floor(total / limit) + 1}
            color='secondary'
            page={page}
            onChange={(event, page) => setPage(page)}
          />
        </ThemeProvider>
      </section>
    </div>
  );
}
