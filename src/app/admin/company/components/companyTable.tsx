import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Divider from '../../../../common/ui/base/divider';
import { CompanyInterface } from '../../../../common/util/common';
import CompanyTableItem from './companyTableItem';

interface Props {
  itemList: [];
  onEditPressed: (item: CompanyInterface) => void;
  onDeletePressed: (item: CompanyInterface) => void;
}
const CompanyTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={2}>Mã Cty</Col>
        <Col sm={3}>Tên Cty</Col>
        <Col sm={3}>SĐT</Col>
        <Col sm={4}>Thao tác</Col>
      </Row>
      <Divider />
      {props.itemList.map((item: CompanyInterface) => {
        return (
          <CompanyTableItem
            item={item}
            onEditPressed={props.onEditPressed}
            onDeletePressed={props.onDeletePressed}
          />
        );
      })}
    </div>
  );
};

export default CompanyTable;
