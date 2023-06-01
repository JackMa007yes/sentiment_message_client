import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ProfileCard from '../../layout/ProfileCard';

export enum MenuItemEnum {
  CHAT = 'Chat',
  USER = 'Users',
  SETTINGS = 'Settings'
}

export interface MenuItemType {
  name: MenuItemEnum;
  icon: JSX.Element;
  path: string;
  count?: number;
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
  }
];

const menuItemStyleMap = {
  selected: 'text-white bg-primary-color cursor-pointer flex justify-between items-center gap-3  p-4 rounded-2xl mb-4 ',
  normal:
    'text-primary-text cursor-pointer flex justify-between items-center gap-3 p-4 rounded-2xl mb-4 hover:text-white hover:bg-primary-color'
};

export default function SideBar() {
  const { sessionList } = useStore(state => state);
  const [curMenuItemName, setCurMenuItemName] = useState(getNameByPath());
  const [itemList, setItemList] = useState(defaultItemList);
  const navigator = useNavigate();

  const handleClick = (item: MenuItemType) => {
    setCurMenuItemName(item.name);
    navigator(item.path);
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
    <div className='w-52 h-screen bg-[#000000] px-4 pt-10 py-4 text-white flex flex-col justify-between items-start'>
      <section className='w-full'>
        {itemList.map(item => {
          return (
            <section
              key={item.name}
              className={item.name === curMenuItemName ? menuItemStyleMap.selected : menuItemStyleMap.normal}
              onClick={() => handleClick(item)}
            >
              <span className='flex gap-4'>
                {item.icon}
                {item.name}
              </span>
              <Badge
                badgeContent={item.count}
                max={99}
                color={item.name === curMenuItemName ? 'default' : 'error'}
                sx={{ mr: 1 }}
              ></Badge>
              {/* {item.count ? <span>{formatCount(item.count)}</span> : null} */}
            </section>
          );
        })}
      </section>
      <ProfileCard />
    </div>
  );
}
