import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  link: string;
  icon: ReactNode;
}
const SidebarItem = (props: Props) => {
  return (
    <Link to={`${props.link}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          height: '50px',
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
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

export default SidebarItem;
