import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { JustNameItemInterface } from '../../../../util/common';
import ActionButtonsRow from './actionButtonsRow';

interface Props {
  item: JustNameItemInterface;
  onEditPressed: (item: JustNameItemInterface) => void;
  onDeletePressed: (item: JustNameItemInterface) => void;
}
const JustNameTableItem = (props: Props) => {
  console.log(props.item);
  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={4} className="spanOverflowLeft">
        {props.item._id}
      </Col>
      <Col sm={4} className="spanOverflowLeft">
        {props.item.name}
      </Col>
      <Col sm={4}>
        <ActionButtonsRow
          editButtonVisible={true}
          deleteButtonVisible={true}
          editButtonPressed={() => props.onEditPressed(props.item)}
          deleteButtonPressed={() => props.onDeletePressed(props.item)}
        />
      </Col>
    </Row>
  );
};

export default JustNameTableItem;
