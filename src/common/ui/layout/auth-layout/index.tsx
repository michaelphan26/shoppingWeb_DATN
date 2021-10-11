import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import './style.scss';

interface Props {
  children: ReactNode;
}
const AuthLayout = (props: Props) => {
  return <div className="center-layout">{props.children}</div>;
};

export default AuthLayout;
