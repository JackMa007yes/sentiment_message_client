import { getBase64 } from '@/utils/avatar';

interface Props {
  user?: User;
  className?: string;
}
export default function Avatar({ user, className }: Props) {
  const getAvatarText = (userName?: string) => {
    return userName ? userName.split('')[0].toUpperCase() : 'N';
  };
  return (
    <section className={className || ''}>
      <section className='border-2 bg-violet-900 border-white rounded-[50%] flex justify-center items-center w-full h-full text-white text-3xl overflow-hidden'>
        {user?.avatar ? <img src={getBase64(user.avatar.data)}></img> : <span>{getAvatarText(user?.name)}</span>}
      </section>
    </section>
  );
}
