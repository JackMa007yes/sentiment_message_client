import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { LogoutOutlined } from '@mui/icons-material';
import LogoutModal from './LogoutModal';
import { useToggle } from 'react-use';
import ProfileDrawer from './ProfileDrawer';

enum MenuItemEnum {
  CHAT = 'Chat',
  USER = 'Users',
  SETTINGS = 'Settings',
  LOGOUT = 'logout'
}

interface MenuItemType {
  name: MenuItemEnum;
  icon: JSX.Element;
  count?: number;
  path: string;
}

const defaultItemList: MenuItemType[] = [
  {
    name: MenuItemEnum.CHAT,
    icon: <ModeCommentOutlinedIcon />,
    count: 0,
    path: '/app/chat'
  },
  {
    name: MenuItemEnum.USER,
    icon: <GroupAddOutlinedIcon />,
    path: '/app/users'
  },
  {
    name: MenuItemEnum.SETTINGS,
    icon: <SettingsOutlinedIcon />,
    path: '/app/settings'
  },
  {
    name: MenuItemEnum.LOGOUT,
    icon: <LogoutOutlined />,
    path: '/app/settings'
  }
];

const menuItemStyleMap = {
  selected: 'text-white bg-primary-color flex justify-center items-center p-3 rounded-2xl w-12 h-12',
  normal: 'text-primary-text flex justify-center items-center p-3 rounded-2xl w-12 h-12'
};

export default function BottomNavigation() {
  const { sessionList } = useStore(state => state);
  const [curMenuItemName, setCurMenuItemName] = useState(getNameByPath());
  const [itemList, setItemList] = useState(defaultItemList);
  const [drawerDisplay, toggleDrawerDisplay] = useToggle(false);
  const navigator = useNavigate();

  const handleClick = (item: MenuItemType) => {
    if (item.name === MenuItemEnum.LOGOUT) {
      toggleDrawerDisplay();
      // logout();
    } else {
      setCurMenuItemName(item.name);
      navigator(item.path);
    }
  };

  function getNameByPath() {
    return defaultItemList.find(item => item.path === location.pathname)?.name || MenuItemEnum.CHAT;
  }

  useEffect(() => {
    const unreadCount = sessionList.map(item => item.unreadCount).reduce((p, c) => p + c, 0);
    setItemList([
      {
        ...defaultItemList[0],
        count: unreadCount
      },
      ...defaultItemList.slice(1)
    ]);
  }, [sessionList]);
  return (
    <div className='absolute bottom-0 left-0 p-2 w-screen z-10 '>
      <div className='flex justify-between items-center rounded-[28px] p-4 bg-[rgba(20,20,20,0.75)] backdrop-blur'>
        {itemList.map(item => {
          return (
            <Badge key={item.name} badgeContent={item.count} max={99} color='error'>
              <section
                className={item.name === curMenuItemName ? menuItemStyleMap.selected : menuItemStyleMap.normal}
                onClick={() => handleClick(item)}
              >
                <span>{item.icon}</span>
              </section>
            </Badge>
          );
        })}
      </div>
      <ProfileDrawer open={drawerDisplay} onClose={toggleDrawerDisplay} />
      {/* // <LogoutModal open={modalDisplay} onClose={toggleModalDisplay} /> */}
    </div>
  );
}
