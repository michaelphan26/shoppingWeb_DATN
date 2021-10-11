import React, { ReactNode } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import './style.scss';
import { Container } from 'react-bootstrap';
import CustomToastContainer from '../../base/toast';

interface Props {
  children: ReactNode;
}
const MainLayout = (props: Props) => {
  return (
    <div>
      <Header />
      <Container className="body">
        {props.children}
        <CustomToastContainer />
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
