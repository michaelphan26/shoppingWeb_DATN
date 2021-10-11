import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import '../style.scss';

interface Props {
  children: ReactNode;
}
const AuthCardView = (props: Props) => {
  return <Container className="auth-card-view">{props.children}</Container>;
};

export default AuthCardView;
