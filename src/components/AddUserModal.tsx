import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Pagination, TextField, createTheme } from '@mui/material';
import { GetUserList } from '@/api';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [limit, setLimit] = React.useState(9);
  const [offset, setOffset] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [userList, setUserList] = React.useState<UserListItem[]>([]);

  // const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useQuery(['GetUserList', limit, offset], () => GetUserList({ limit, offset }), {
    onSuccess: data => {
      setUserList(data.data);
      setTotal(data.total);
    }
  });

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-[40px] bg-[#26282e] border-2'>
          <TextField fullWidth className='bg-white'></TextField>
          <section className='flex justify-start w-[500px] h-[300px] gap-4 flex-wrap my-4'>
            {userList.map(item => {
              return (
                <section key={item.id} className='w-[154px] h-[80px] rounded-2xl border-2'>
                  <section className='text-3xl text-white'>{item.name}</section>
                </section>
              );
            })}
          </section>
          <section className='text-white'>
            <Pagination
              count={Math.floor(total / limit) + 1}
              color='secondary'
              page={offset}
              // classes={{ ul: classes.ul }}
            />
          </section>
        </div>
      </Modal>
    </div>
  );
}
