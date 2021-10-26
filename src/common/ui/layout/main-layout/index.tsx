import React, { ReactNode, useState } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import './style.scss';
import { Container } from 'react-bootstrap';
import CustomToastContainer from '../../base/toast';
import Sidebar from 'react-sidebar';
import SidebarContent from './components/sidebarContent';

interface Props {
  children: ReactNode;
}
const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSidebarOpen = (event) => {
    event.preventDefault();
    setSideBarOpen(!sideBarOpen);
  };

  const onSetOpen = () => {
    setSideBarOpen(false);
  };

  return (
    <Sidebar
      sidebar={<SidebarContent />}
      open={sideBarOpen}
      styles={{ sidebar: { background: 'white', maxWidth: '250px' } }}
      transitions={true}
      onSetOpen={onSetOpen}
      shadow={true}
    >
      <div>
        <Header toggleSidebar={toggleSidebarOpen} />
        <Container className="body">
          {props.children}
          <CustomToastContainer />
        </Container>
        <Footer />
      </div>
    </Sidebar>
  );
};

export default MainLayout;
