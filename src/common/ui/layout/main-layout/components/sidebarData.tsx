import React from 'react';
import { HiHome } from 'react-icons/hi';
import { IoMdPricetag } from 'react-icons/io';
import { RiContactsBookFill } from 'react-icons/ri';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { Url } from '../../../../util/enum';

export const SidebarData = [
  {
    title: 'Trang chủ',
    link: Url.Home,
    icon: <HiHome size={20} />,
  },
  {
    title: 'Danh mục',
    link: Url.Category,
    icon: <IoMdPricetag size={20} />,
  },
  {
    title: 'Liên hệ',
    link: Url.Contact,
    icon: <RiContactsBookFill size={20} />,
  },
  {
    title: 'Hỗ trợ',
    link: Url.Support,
    icon: <HiQuestionMarkCircle size={20} />,
  },
];

export default SidebarData;
