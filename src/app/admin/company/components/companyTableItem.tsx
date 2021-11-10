import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CompanyInterface } from '../../../../common/util/common';
import ActionButtonsRow from '../../../../common/ui/layout/admin-layout/components/actionButtonsRow';

interface Props {
  item: CompanyInterface;
  onEditPressed: (item: CompanyInterface) => void;
  onDeletePressed: (item: CompanyInterface) => void;
}
const CompanyTableItem = (props: Props) => {
  console.log(props.item);
  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={2} className="spanOverflowLeft">
        {props.item._id}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {props.item.name}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {props.item.phone}
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

export default CompanyTableItem;
