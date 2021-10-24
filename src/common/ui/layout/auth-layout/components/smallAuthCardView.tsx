import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import '../style.scss';

interface Props {
  children: ReactNode;
}
const SmallAuthCardView = (props: Props) => {
  return (
    <Container className="small-auth-card-view">{props.children}</Container>
  );
};

export default SmallAuthCardView;
