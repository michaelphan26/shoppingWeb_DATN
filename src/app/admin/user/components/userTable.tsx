import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Divider from '../../../../common/ui/base/divider';
import {
  UserDetailInterface,
  UserInterface,
} from '../../../../common/util/common';
import UserTableItem from './userTableItem';

interface Props {
  userList: [];
  userDetailList: [];
  roleList: [];
  onEditPressed: (user: UserInterface, userDetail: UserDetailInterface) => void;
}
const UserTable = (props: Props) => {
  return (
    <div
      className="roundedContainer"
      style={{ marginLeft: '10px', padding: '10px' }}
    >
      <Row>
        <Col sm={2}>Email</Col>
        <Col sm={3}>Tên</Col>
        <Col sm={3}>SĐT</Col>
        <Col sm={2}>Chức vụ</Col>
        <Col sm={2}>Thao tác</Col>
      </Row>
      <Divider />
      {props.userList.map((user: UserInterface) => {
        return (
          <UserTableItem
            user={user}
            userInfo={props.userDetailList}
            roleList={props.roleList}
            onEditPressed={props.onEditPressed}
          />
        );
      })}
    </div>
  );
};

export default UserTable;
