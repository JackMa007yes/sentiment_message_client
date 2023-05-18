import Upload from 'rc-upload';
import { getToken } from '@/api/http';
import Avatar from '@/components/ui/Avatar';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { GetProfile } from '@/api';
import { useSnackbar } from 'notistack';

export default function AvatarSetting() {
  const { profile, setProfile } = useStore(state => state);
  const { enqueueSnackbar } = useSnackbar();

  const { refetch } = useQuery(['GetProfile'], GetProfile, {
    onSuccess: setProfile
  });

  const beforeUpload = (file: any) => {
    const typeIsAvailable = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';

    if (!typeIsAvailable) {
      enqueueSnackbar('The picture must be in JPG/JPEG/PNG format', { variant: 'error' });
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      enqueueSnackbar('The image must be smaller than 2m', { variant: 'error' });
    }

    return typeIsAvailable && isLt2M;
  };

  const props = {
    action: '/api/user/avatar',
    headers: {
      authorization: (() => {
        return getToken();
      })()
    },
    multiple: false,
    beforeUpload,
    onSuccess() {
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };

  return (
    <div className='flex'>
      <section className='w-[200px] text-gray-300'>Avatar</section>
      <section>
        <Upload {...props}>{<Avatar user={profile} className='w-32 h-32'></Avatar>}</Upload>
      </section>
    </div>
  );
}
