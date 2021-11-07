import React, { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../main-layout/components/footer';
import Header from './components/header';
import CustomToastContainer from '../../base/toast';
import './style.scss';
import AdminSideBar from './components/adminSidebar';

interface Props {
  children: ReactNode;
}
const AdminLayout = (props: Props) => {
  return (
    <div>
      <Header />
      <div className="body">
        <Row>
          <Col style={{ maxWidth: '15vw' }}>
            <AdminSideBar />
          </Col>

          <Col style={{ maxWidth: '84vw' }}>{props.children}</Col>
        </Row>
        <CustomToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
