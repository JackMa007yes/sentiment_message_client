import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { useStore } from '@/store';
import { MemojiList, MemojiOption, getMemojiOptionByUser } from '@/constants/memoji';
import { GetProfile, UpdateProfile } from '@/api';
import { useIsPC } from '@/hooks/useIsPC';

export default function memojiSetting() {
  const { profile, setProfile } = useStore(state => state);
  const [selected, setSelected] = useState(profile ? getMemojiOptionByUser(profile) : MemojiList[0]);
  const { enqueueSnackbar } = useSnackbar();
  const isPC = useIsPC();

  const { refetch } = useQuery(['GetProfile'], GetProfile, {
    onSuccess: setProfile
  });

  const { mutate: updateMutate } = useMutation(['UpdateProfile'], UpdateProfile, {
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Update profile success', { variant: 'success' });
    }
  });

  const handleSelect = (item: MemojiOption) => {
    if (item.lock) return;
    setSelected(item);
  };

  const submit = () => {
    if (selected) {
      updateMutate({ memoji: selected.value });
    }
  };

  useEffect(() => {
    profile && setSelected(getMemojiOptionByUser(profile));
  }, [profile]);

  return (
    <div className={`my-8 overflow-hidden ${isPC ? 'h-[calc(100vh-100px)]' : 'h-[calc(100dvh-180px)]'}`}>
      <section className={`flex  ${isPC ? 'gap-6 h-[calc(100%-80px)]' : 'flex-col gap-4'}`}>
        <section className={`overflow-auto h-full scroll-m-0 pr-4  ${isPC ? '' : 'flex gap-6'}`}>
          {MemojiList.map(item => {
            return (
              <div
                key={item.value}
                className={`w-32 h-32 overflow-hidden rounded-2xl border-2 cursor-pointer flex justify-center flex-shrink-0 items-center mb-6 bg-[#1c1c1e] relative ${
                  selected.value === item.value ? 'border-primary-color' : 'border-primary-text'
                }`}
                onClick={() => handleSelect(item)}
              >
                <img src={item.img} alt='' className='w-24 hover:scale-105'></img>
                {item.lock ? (
                  <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.7)]'>
                    <EnhancedEncryptionIcon />
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
        <section className='bg-black  flex justify-center h-52'>
          <video src={selected.video?.src || ''} autoPlay loop playsInline muted data-inline-media></video>
        </section>
      </section>
      <section className='mt-4 flex justify-end'>
        <Button variant='outlined' onClick={submit}>
          Confirm
        </Button>
      </section>
    </div>
  );
}
