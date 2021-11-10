import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  initialJustNameItem,
  initialUserDetailInterface,
  JustNameItemInterface,
  UserDetailInterface,
  UserInterface,
} from '../../../../common/util/common';
import ActionButtonsRow from '../../../../common/ui/layout/admin-layout/components/actionButtonsRow';

interface Props {
  userInfo: [];
  roleList: [];
  user: UserInterface;
  onEditPressed: (user: UserInterface, userDetail: UserDetailInterface) => void;
}
const UserTableItem = (props: Props) => {
  const [userDetail, setUserDetail] = useState<UserDetailInterface>(
    initialUserDetailInterface
  );
  const [roleName, setRoleName] = useState<string>('');

  useEffect(() => {
    const detail: UserDetailInterface =
      props.userInfo.find((item: UserDetailInterface) => {
        return item._id === props.user.id_userInfo;
      }) ?? initialUserDetailInterface;
    setUserDetail(detail);

    const role: JustNameItemInterface =
      props.roleList.find((item: JustNameItemInterface) => {
        return item._id === props.user.id_role;
      }) ?? initialJustNameItem;
    setRoleName(role.name);
  });

  return (
    <Row style={{ marginTop: '15px', marginBottom: '5px' }}>
      <Col sm={2} className="spanOverflowLeft">
        {props.user.email}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {userDetail.name}
      </Col>
      <Col sm={3} className="spanOverflowLeft">
        {userDetail.phone}
      </Col>
      <Col sm={2} className="spanOverflowLeft">
        {roleName}
      </Col>
      <Col sm={2}>
        <ActionButtonsRow
          editButtonVisible={true}
          deleteButtonVisible={false}
          editButtonPressed={() => props.onEditPressed(props.user, userDetail)}
          deleteButtonPressed={() => {}}
        />
      </Col>
    </Row>
  );
};

export default UserTableItem;
