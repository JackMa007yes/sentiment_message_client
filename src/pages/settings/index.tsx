import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import MemojiSetting from './memojiSetting';
import ProfileSetting from './profileSetting';
import PasswordSetting from './passwordSetting';
import { useIsPC } from '@/hooks/useIsPC';

enum TabEnum {
  Memoji = 'memoji',
  Profile = 'profile',
  Password = 'password'
}

const TabMap = {
  [TabEnum.Memoji]: <MemojiSetting />,
  [TabEnum.Profile]: <ProfileSetting />,
  [TabEnum.Password]: <PasswordSetting />
};

export default function index() {
  const isPC = useIsPC();
  const [curTab, setCurTab] = useState<TabEnum>(TabEnum.Memoji);

  return (
    <div className={`bg-primary-bg h-full text-white ${isPC ? 'p-10' : 'p-4'}`}>
      <Box sx={{ width: '100%' }}>
        <Tabs value={curTab} textColor='secondary' indicatorColor='secondary' onChange={(e, v) => setCurTab(v)}>
          <Tab value={TabEnum.Memoji} label='Memoji' />
          <Tab value={TabEnum.Profile} label='Profile' />
          <Tab value={TabEnum.Password} label='Password' />
        </Tabs>
        {TabMap[curTab]}
      </Box>
    </div>
  );
}
