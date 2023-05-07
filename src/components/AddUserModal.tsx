import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Pagination, TextField, createTheme } from '@mui/material';
import { CreateRoom, GetUserList } from '@/api';
import { ThemeProvider } from '@emotion/react';
import Input from '@/pages/room/room/Input';
import { getBase64 } from '@/utils/avatar';
import SelectBox from '../pages/users/UserCard';
import { useStore } from '@/store';
import { RoomType } from '@/constants';
import CustomTextField from './ui/CustomTextFiled';

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

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
};

export default function BasicModal({ open, onClose, onAdd }: Props) {
  const user = useStore(state => state.user);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  // const classes = useStyles();
  const { mutate: createRoomMutate } = useMutation(['CreateRoom'], (data: CreateRoomParams) => CreateRoom(data), {
    onSuccess: () => {
      onAdd();
    }
  });

  const handleSelected = (selectedUserId: number) => {
    if (!user) return;
    createRoomMutate({ type: RoomType.PERSONAL, users: [selectedUserId, user.id] });
  };

  useQuery(['GetUserList', limit, page], () => GetUserList({ limit, page }), {
    onSuccess: data => {
      setUserList(data.data);
      setTotal(data.total);
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-[40px] bg-[#26282e] '>
          {/* <TextField fullWidth className='bg-white'></TextField> */}
          {/* <Input></Input> */}
          <section className='w-full'>
            <CustomTextField fullWidth />
            {/* <TextField id='outlined-basic' fullWidth variant='filled' /> */}
          </section>
          <section className='flex justify-start w-[940px] items-start gap-4 flex-wrap my-8'>
            {userList.map(item => {
              return (
                <SelectBox key={item.id} user={item} onSelect={handleSelected} selected={item.id === selectedUserId} />
              );
            })}
          </section>
          <section className='text-white flex justify-center'>
            <ThemeProvider theme={theme}>
              <Pagination
                count={Math.floor(total / limit) + 1}
                color='secondary'
                page={page}
                onChange={(event, page) => setPage(page)}
                // classes={{ ul: classes.ul }}
              />
            </ThemeProvider>
          </section>
        </div>
      </Modal>
    </div>
  );
}
