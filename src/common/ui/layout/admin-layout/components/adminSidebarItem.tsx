import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  link: string;
  icon: ReactNode;
}
const AdminSidebarItem = (props: Props) => {
  return (
    <Link to={`${props.link}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          height: '40px',
          marginTop: '5px',
          paddingLeft: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          color: 'white',
        }}
      >
        <div>
          {props.icon}
          <span style={{ marginLeft: '10px' }}>{props.title}</span>
        </div>
      </div>
    </Link>
  );
};

export default AdminSidebarItem;
