import React, { ReactNode } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import './style.scss';
import { Container } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}
const MainLayout = (props: Props) => {
  return (
    <div className="main-layout">
      <Header />
      <Container className="body">{props.children}</Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
