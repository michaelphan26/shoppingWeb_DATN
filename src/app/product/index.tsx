import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { RouteComponentProps, StaticContext } from 'react-router';
import MainLayout from '../../common/ui/layout/main-layout';
import { ProductItem } from '../../common/util/common';

type ProductState = {
  productItem: ProductItem;
};
interface Props extends RouteComponentProps<{}, StaticContext, ProductState> {}
const Product = (props: Props) => {
  console.log(props.location.state.productItem);
  return (
    <MainLayout>
      <Row>
        <Col sm={1} md={1} lg={2} xl={2}></Col>
        <h3>{props.location.state.productItem.name}</h3>
      </Row>
    </MainLayout>
  );
};

export default Product;
