import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Avatar from '../../pages/users/Avatar';
import { useStore } from '@/store';
import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

enum MenuItemEnum {
  Chat = 'Chat',
  Users = 'Users',
  Settings = 'Settings'
}

interface MenuItemType {
  name: MenuItemEnum;
  icon: JSX.Element;
  path: string;
}

const itemList: MenuItemType[] = [
  {
    name: MenuItemEnum.Chat,
    icon: <ModeCommentOutlinedIcon />,
    path: '/app/chat'
  },
  {
    name: MenuItemEnum.Users,
    icon: <GroupAddOutlinedIcon />,
    path: '/app/users'
  },
  {
    name: MenuItemEnum.Settings,
    icon: <SettingsOutlinedIcon />,
    path: '/app/settings'
  }
];

const menuItemStyleMap = {
  selected: 'text-white bg-primary-color cursor-pointer flex gap-3 p-4 rounded-2xl mb-4',
  normal: 'text-primary-text cursor-pointer flex gap-3 p-4 rounded-2xl mb-4 hover:text-white hover:bg-primary-color'
};

export default function SideBar() {
  const [curMenuItemName, setCurMenuItemName] = useState(getNameByPath());
  const user = useStore(state => state.user);
  const Navigater = useNavigate();

  const handleClick = (item: MenuItemType) => {
    setCurMenuItemName(item.name);
    Navigater(item.path);
  };

  function getNameByPath() {
    return itemList.find(item => item.path === location.pathname)?.name || MenuItemEnum.Chat;
  }

  return (
    <div className='w-52 h-screen bg-[#000000] px-4 py-10 text-white flex flex-col justify-between items-start'>
      <section className='w-full'>
        {itemList.map(item => {
          return (
            <section
              key={item.name}
              className={item.name === curMenuItemName ? menuItemStyleMap.selected : menuItemStyleMap.normal}
              onClick={() => handleClick(item)}
            >
              {item.icon}
              {item.name}
            </section>
          );
        })}
      </section>
      <section className='border-2 border-primary-color rounded-[44px] w-full p-4 flex justify-between'>
        <Avatar user={user} className='w-14 h-14 rounded-[50%] overflow-hidden' />
        <IconButton aria-label='delete' size='large'>
          <LogoutRoundedIcon />
        </IconButton>
      </section>
    </div>
  );
}
