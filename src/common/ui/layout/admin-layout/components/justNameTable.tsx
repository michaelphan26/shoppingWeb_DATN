import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { JustNameItemInterface } from '../../../../util/common';
import Divider from '../../../base/divider';
import JustNameTableItem from './justNameTableItem';

interface Props {
  itemList: [];
  idTitle: string;
  nameTitle: string;
  onEditPressed: (item: JustNameItemInterface) => void;
  onDeletePressed: (item: JustNameItemInterface) => void;
}
const JustNameTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={4}>{props.idTitle}</Col>
        <Col sm={4}>{props.nameTitle}</Col>
        <Col sm={4}>Thao tác</Col>
      </Row>
      <Divider />
      {props.itemList.map((item: JustNameItemInterface) => {
        return (
          <JustNameTableItem
            item={item}
            onEditPressed={props.onEditPressed}
            onDeletePressed={props.onDeletePressed}
          />
        );
      })}
    </div>
  );
};

export default JustNameTable;
