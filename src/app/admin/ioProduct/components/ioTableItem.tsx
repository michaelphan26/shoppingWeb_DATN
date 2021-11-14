import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  initialJustNameItem,
  ioProductInterface,
  JustNameItemInterface,
} from '../../../../common/util/common';
import { SmallMainButton } from '../../../../common/ui/base/button';
import { Color } from '../../../../common/util/enum';
import numeral from 'numeral';

interface Props {
  item: ioProductInterface;
  ioTypeList: [];
  onDetailPressed: (
    ioProduct: ioProductInterface,
    ioType: JustNameItemInterface
  ) => void;
}
const IOTableItem = (props: Props) => {
  const [ioType, setIOType] =
    useState<JustNameItemInterface>(initialJustNameItem);

  useEffect(() => {
    const type: JustNameItemInterface =
      props.ioTypeList.find((ioTypeItem: JustNameItemInterface) => {
        return ioTypeItem._id === props.item.id_ioType;
      }) ?? initialJustNameItem;
    setIOType(type);
  });

  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={4} className="spanOverflowLeft">
        {props.item._id}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {props.item.date}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {ioType.name}
      </Col>
      <Col sm={2}>
        <SmallMainButton
          backgroundColor={Color['light-blue']}
          onPressed={() => {
            props.onDetailPressed(props.item, ioType);
          }}
          title="Chi tiết"
          textColor={Color.white}
        />
      </Col>
    </Row>
  );
};

export default IOTableItem;
