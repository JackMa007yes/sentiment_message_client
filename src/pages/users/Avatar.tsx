import { getBase64 } from '@/utils/avatar';

interface Props {
  user: User | null;
  className?: string;
}
export default function Avatar({ user, className }: Props) {
  const getAvatarText = (userName?: string) => {
    return userName ? userName.split('')[0].toUpperCase() : '';
  };
  return (
    <section className={className || ''}>
      <section className='bg-gray-600 flex justify-center items-center w-full h-full text-white text-3xl overflow-hidden'>
        {user?.avatar?.data?.length ? (
          <img src={getBase64(user.avatar.data)}></img>
        ) : (
          <span>{getAvatarText(user?.name)}</span>
        )}
      </section>
    </section>
  );
}
