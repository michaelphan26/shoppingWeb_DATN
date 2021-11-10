import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductItem, StatusInterface } from '../../../common/util/common';
import numeral from 'numeral';
import { SmallMainButton } from '../../../common/ui/base/button';
import { Color } from '../../../common/util/enum';
import ActionButtonsRow from '../../../common/ui/layout/admin-layout/components/actionButtonsRow';

interface Props {
  item: ProductItem;
  productList: [];
  onEditPressed: (item: ProductItem) => void;
}
const ProductTableItem = (props: Props) => {
  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={3} className="spanOverflowLeft">
        {props.item.name}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {numeral((props.item.price * (100 - props.item.discount)) / 100).format(
          0,
          0
        )}{' '}
        đ
      </Col>
      <Col sm={2} className="spanOverflowLeft">
        {props.item.stock}
      </Col>
      <Col sm={2} className="spanOverflowLeft">
        {props.item.status ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
      </Col>
      <Col sm={2}>
        <ActionButtonsRow
          editButtonVisible={true}
          deleteButtonVisible={false}
          editButtonPressed={() => props.onEditPressed(props.item)}
          deleteButtonPressed={() => {}}
        />
      </Col>
    </Row>
  );
};

export default ProductTableItem;
