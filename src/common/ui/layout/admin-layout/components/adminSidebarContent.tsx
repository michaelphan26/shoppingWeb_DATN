import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminSidebarData from './adminSidebarData';
import AdminSidebarItem from './adminSidebarItem';

const AdminSidebarContent = () => {
  return (
    <Col>
      <Row>
        {AdminSidebarData.map((data) => {
          return (
            <AdminSidebarItem
              title={data.title}
              link={data.link}
              icon={data.icon}
            />
          );
        })}
      </Row>
    </Col>
  );
};

export default AdminSidebarContent;
