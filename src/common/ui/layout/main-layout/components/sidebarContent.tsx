import React from 'react';
import { Row } from 'react-bootstrap';
import Divider from '../../../base/divider';
import SidebarData from './sidebarData';
import SidebarItem from './sidebarItem';

const SidebarContent = () => {
  return (
    <Row>
      <Row style={{ textAlign: 'center', marginTop: '20px' }}>
        <h4>E shop</h4>
      </Row>
      <Divider />
      {SidebarData.map((data) => {
        return (
          <SidebarItem title={data.title} link={data.link} icon={data.icon} />
        );
      })}
    </Row>
  );
};

export default SidebarContent;
