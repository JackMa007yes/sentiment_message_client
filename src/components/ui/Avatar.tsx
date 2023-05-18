import { getImageUrl } from '@/utils/image';

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
        {user?.avatar ? <img src={getImageUrl(user.avatar)} alt=''></img> : <span>{getAvatarText(user?.name)}</span>}
      </section>
    </section>
  );
}
