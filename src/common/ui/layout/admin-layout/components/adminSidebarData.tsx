import React from 'react';
import { BiCategory, BiImport, BiReceipt } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';
import { Url } from '../../../../util/enum';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdOutlineContacts } from 'react-icons/md';
import { AiOutlinePieChart } from 'react-icons/ai';

export const AdminSidebarData = [
  {
    title: 'Danh mục',
    link: Url.AdminCategory,
    icon: <BiCategory size={20} />,
  },
  {
    title: 'Sản phẩm',
    link: Url.AdminProduct,
    icon: <IoMdPricetag size={20} />,
  },
  {
    title: 'Tài khoản',
    link: Url.AdminAccount,
    icon: <BsFillPersonLinesFill size={20} />,
  },
  {
    title: 'Chức vụ',
    link: Url.AdminRole,
    icon: <BsFillPersonLinesFill size={20} />,
  },
  {
    title: 'Hóa đơn',
    link: Url.AdminReceipt,
    icon: <BiReceipt size={20} />,
  },
  {
    title: 'Loại hóa đơn',
    link: Url.AdminReceiptType,
    icon: <BiReceipt size={20} />,
  },
  {
    title: 'Nhập xuất',
    link: Url.AdminIO,
    icon: <BiImport size={20} />,
  },
  {
    title: 'Loại nhập xuất',
    link: Url.AdminIOType,
    icon: <BiImport size={20} />,
  },
  {
    title: 'Đối tác',
    link: Url.AdminCompany,
    icon: <MdOutlineContacts size={20} />,
  },
  {
    title: 'Thống kê',
    link: Url.AdminStatistic,
    icon: <AiOutlinePieChart size={20} />,
  },
];

export default AdminSidebarData;
