import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Divider from '../../../common/ui/base/divider';
import { ProductItem } from '../../../common/util/common';
import ProductTableItem from './productTableItem';

interface Props {
  productList: [];
  onEditPressed: (item: ProductItem) => void;
}
const ProductTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={3}>Tên</Col>
        <Col sm={3}>Giá bán</Col>
        <Col sm={2}>Số lượng tồn</Col>
        <Col sm={2}>Trạng thái</Col>
        <Col sm={2}>Thao tác</Col>
      </Row>
      <Divider />
      {props.productList.map((item: ProductItem) => {
        return (
          <ProductTableItem
            item={item}
            productList={props.productList}
            onEditPressed={props.onDetailPressed}
          />
        );
      })}
    </div>
  );
};

export default ProductTable;
