import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetProfile } from '@/api';
import { useStore } from '@/store';
import Layout from './Layout';
import UserBar from './userBar';
import Room from './room';

export default function index() {
  const setUser = useStore(state => state.setUser);
  const [currentUser, setCurrentUser] = useState<null | UserListItem>(null);

  useQuery(['GetProfile'], GetProfile, {
    onSuccess: setUser
  });

  return (
    <Layout>
      <section className='flex justify-between'>
        <UserBar current={currentUser} onSelect={setCurrentUser} />
        <Room user={currentUser} />
      </section>
    </Layout>
  );
}
