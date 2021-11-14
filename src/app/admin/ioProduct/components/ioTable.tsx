import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Divider from '../../../../common/ui/base/divider';
import {
  ioProductInterface,
  JustNameItemInterface,
} from '../../../../common/util/common';
import IOTableItem from './ioTableItem';

interface Props {
  itemList: [];
  ioTypeList: [];
  onDetailPressed: (
    ioProduct: ioProductInterface,
    ioType: JustNameItemInterface
  ) => void;
}
const IOTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={4}>Mã HĐ</Col>
        <Col sm={3}>Ngày</Col>
        <Col sm={3}>Loại HĐ</Col>
        <Col sm={2}>Thao tác</Col>
      </Row>
      <Divider />
      {props.itemList.map((item: ioProductInterface) => {
        return (
          <IOTableItem
            item={item}
            ioTypeList={props.ioTypeList}
            onDetailPressed={props.onDetailPressed}
          />
        );
      })}
    </div>
  );
};

export default IOTable;
