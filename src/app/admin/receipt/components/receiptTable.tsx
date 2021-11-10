import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Divider from '../../../../common/ui/base/divider';
import {
  JustNameItemInterface,
  ReceiptInterface,
} from '../../../../common/util/common';
import ReceiptTableItem from './receiptTableItem';

interface Props {
  itemList: [];
  receiptTypeList: [];
  onDetailPressed: (
    receipt: ReceiptInterface,
    receiptType: JustNameItemInterface
  ) => void;
}
const ReceiptTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={2}>Mã HĐ</Col>
        <Col sm={3}>Ngày</Col>
        <Col sm={3}>Thành tiền</Col>
        <Col sm={2}>Loại HĐ</Col>
        <Col sm={2}>Thao tác</Col>
      </Row>
      <Divider />
      {props.itemList.map((item: ReceiptInterface) => {
        return (
          <ReceiptTableItem
            item={item}
            receiptTypeList={props.receiptTypeList}
            onDetailPressed={props.onDetailPressed}
          />
        );
      })}
    </div>
  );
};

export default ReceiptTable;
