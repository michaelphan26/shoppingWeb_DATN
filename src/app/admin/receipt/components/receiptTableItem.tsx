import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  initialJustNameItem,
  ReceiptInterface,
  JustNameItemInterface,
} from '../../../../common/util/common';
import { SmallMainButton } from '../../../../common/ui/base/button';
import { Color } from '../../../../common/util/enum';
import numeral from 'numeral';

interface Props {
  item: ReceiptInterface;
  receiptTypeList: [];
  onDetailPressed: (
    receipt: ReceiptInterface,
    receiptType: JustNameItemInterface
  ) => void;
}
const ReceiptTableItem = (props: Props) => {
  const [receiptType, setReceiptType] =
    useState<JustNameItemInterface>(initialJustNameItem);

  useEffect(() => {
    const type: JustNameItemInterface =
      props.receiptTypeList.find((receiptType: JustNameItemInterface) => {
        return receiptType._id === props.item.id_receiptType;
      }) ?? initialJustNameItem;
    setReceiptType(type);
  });

  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={2} className="spanOverflowLeft">
        {props.item._id}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {props.item.date}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {numeral(props.item.total).format(0, 0)} đ
      </Col>
      <Col sm={2} className="spanOverflowLeft">
        {receiptType.name}
      </Col>
      <Col sm={2}>
        <SmallMainButton
          backgroundColor={Color['light-blue']}
          onPressed={() => {
            props.onDetailPressed(props.item, receiptType);
          }}
          title="Chi tiết"
          textColor={Color.white}
        />
      </Col>
    </Row>
  );
};

export default ReceiptTableItem;
