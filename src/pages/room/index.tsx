import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetProfile, UploadAvatar } from '@/api';
import { useStore } from '@/store';
import Layout from './Layout';
import UserBar from './userBar';
import Room from './room';
import AddUserModal from '@/components/AddUserModal';
import Upload from 'rc-upload';
import { getToken } from '@/api/http';

export default function index() {
  const setUser = useStore(state => state.setUser);
  const user = useStore(state => state.user);

  const props = {
    action: '/api/user/avatar',
    headers: {
      authorization: (() => {
        console.log(88888);
        return getToken();
      })()
    },
    multiple: false,
    onStart(file) {
      console.log('onStart', file, file.name);
    },
    onSuccess(ret) {
      console.log('onSuccess', ret);
    },
    onError(err) {
      console.log('onError', err);
    }
  };

  console.log(user);

  const [currentUser, setCurrentUser] = useState<null | UserListItem>(null);

  useQuery(['GetProfile'], GetProfile, {
    onSuccess: setUser
  });

  return (
    // <>
    //   <div id='a'></div>
    //   <AddUserModal />
    //   <Upload {...props}>
    //     <a>开始上传</a>
    //   </Upload>
    // </>

    <Layout>
      <section className='flex justify-between'>
        <UserBar current={currentUser} onSelect={setCurrentUser} />
        <Room user={currentUser} />
      </section>
    </Layout>
  );
}
