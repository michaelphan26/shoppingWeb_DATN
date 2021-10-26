import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  JustNameItemInterface,
  ReceiptInterface,
} from '../../../../util/common';
import numeral from 'numeral';
import { SmallMainButton } from '../../../base/button';
import { Color } from '../../../../util/enum';

interface Props {
  receipt: ReceiptInterface;
  receiptTypeList: [];
  onDetailPressed: (
    receipt: ReceiptInterface,
    receiptType: JustNameItemInterface
  ) => void;
}
const ReceiptItemView = (props: Props) => {
  const [receiptType, setReceiptType] = useState<JustNameItemInterface>({
    _id: '',
    name: '',
  });

  const getReceiptTypeName = () => {
    const receiptTypeFind = props.receiptTypeList.find(
      (item: JustNameItemInterface) => item._id === props.receipt.id_receiptType
    );
    if (typeof receiptTypeFind !== 'undefined') {
      setReceiptType(receiptTypeFind);
    }
  };

  useEffect(() => {
    getReceiptTypeName();
  });

  return (
    <Row className="receiptItem">
      <Col sm={3}>
        <span className="spanOverflow">{props.receipt._id}</span>
      </Col>
      <Col sm={3}>
        <span className="spanOverflow">{props.receipt.date}</span>
      </Col>
      <Col sm={2}>
        <span className="spanOverflow">{receiptType.name}</span>
      </Col>
      <Col sm={2} style={{ textAlign: 'center' }}>
        <span className="spanOverflow">
          {numeral(props.receipt.total).format(0, 0)} đ
        </span>
      </Col>
      <Col sm={2}>
        <SmallMainButton
          title="Xem"
          backgroundColor={Color['light-blue']}
          textColor={Color.white}
          onPressed={() => props.onDetailPressed(props.receipt, receiptType)}
        >
          <></>
        </SmallMainButton>
      </Col>
    </Row>
  );
};

export default ReceiptItemView;
