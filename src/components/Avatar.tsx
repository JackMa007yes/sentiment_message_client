import { useStore } from '@/store';
import { getBase64 } from '@/utils/avatar';

export default function Avatar() {
  const user = useStore(state => state.user);

  const getAvatarText = (userName?: string) => {
    console.log(userName);
    return userName ? userName.split('')[0].toUpperCase() : 'N';
  };
  return (
    <section className='w-28 p-8 flex-0'>
      <section className='border-2 bg-violet-900 border-white w-16 h-16 rounded-[50%] flex justify-center items-center text-white text-3xl overflow-hidden'>
        {user && user.avatar ? <img src={getBase64(user.avatar.data)}></img> : <span>{getAvatarText(user?.name)}</span>}
      </section>
    </section>
  );
}
