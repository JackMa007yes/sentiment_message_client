import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ProfileSetting from './profileSetting';
import PasswordSetting from './passwordSetting';

enum TabEnum {
  Profile = 'profile',
  Password = 'password'
}
export default function index() {
  const [curTab, setCurTab] = useState<TabEnum>(TabEnum.Profile);

  return (
    <div className='bg-primary-bg h-screen p-10 text-white'>
      <Box sx={{ width: '100%' }}>
        <Tabs value={curTab} textColor='secondary' indicatorColor='secondary' onChange={(e, v) => setCurTab(v)}>
          <Tab value={TabEnum.Profile} label='Profile' />
          <Tab value={TabEnum.Password} label='Password' />
        </Tabs>
        {curTab === TabEnum.Profile ? <ProfileSetting /> : <PasswordSetting />}
      </Box>
    </div>
  );
}
