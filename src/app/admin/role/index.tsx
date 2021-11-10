import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { SmallMainButton } from '../../../common/ui/base/button';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import JustNameTable from '../../../common/ui/layout/admin-layout/components/justNameTable';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  addJustName,
  adminAddRoleUrl,
  adminDeleteRoleUrl,
  adminEditRoleUrl,
  deleteJustName,
  editJustName,
  getRoleFromAPI,
} from '../../../common/util/baseAPI';
import {
  initialJustNameItem,
  JustNameItemInterface,
} from '../../../common/util/common';
import { Color, NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';

const AdminRole = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [roleList, setRoleList] = useState([] as any);
  const [role, setRole] = useState<JustNameItemInterface>(initialJustNameItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getRoleListAdmin = async () => {
    const roleListFromAPI = await getRoleFromAPI();
    if (Object.keys(roleListFromAPI).length !== 0) {
      setRoleList(roleListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách chức vụ');
    }
  };

  useEffect(() => {
    if (
      (account.role_name.trim().toLowerCase() === 'admin') === false &&
      (account.role_name.trim().toLowerCase() === 'quản trị') === false
    ) {
      history.push(Url.Home);
      toastNotify(NotifyType.warning, 'Bạn không thể vào được trang này');
    } else {
      getRoleListAdmin();
    }
  }, []);

  const handleRefreshPressed = () => {
    getRoleListAdmin();
  };

  const handleAddPressed = () => {
    setRole(initialJustNameItem);
    setName('');
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (item: JustNameItemInterface) => {
    setRole(item);
    setName(item.name);
    setModalShow(true);
    setIsEditing(true);
  };

  const handleDeletePressed = (item: JustNameItemInterface) => {
    setRole(item);
    setDeleteModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setDeleteModalShow(false);
    setRole(initialJustNameItem);
    setName('');
    setIsEditing(false);
  };

  const handleSavePressed = async () => {
    if (isEditing) {
      if (name.trim().length > 1 && name.trim().length < 21) {
        role.name = name.trim();
        const code = await editJustName(adminEditRoleUrl, role);
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Chỉnh sửa chức vụ thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Chỉnh sửa chức vụ thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    } else {
      if (name.trim().length > 1 && name.trim().length < 21) {
        role.name = name.trim();
        const code = await addJustName(adminAddRoleUrl, name.trim());
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm chức vụ thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm chức vụ thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    }
  };

  const handleDeleteOkPressed = async () => {
    const code = await deleteJustName(adminDeleteRoleUrl, role);
    if (code === 200) {
      handleModalClose();
      toastNotify(NotifyType.success, 'Xóa chức vụ thành công');
      handleRefreshPressed();
    } else {
      handleModalClose();
      toastNotify(NotifyType.error, 'Xóa chức vụ thất bại');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý chức vụ
      </h3>
      <Row style={{ marginBottom: '10px' }}>
        <Col sm={9} />
        <Col sm={3}>
          <ManageButtonsRow
            refreshButtonPressed={handleRefreshPressed}
            addButtonPressed={handleAddPressed}
            addButtonVisible={true}
          />
        </Col>
      </Row>
      <JustNameTable
        itemList={roleList}
        onEditPressed={handleEditPressed}
        onDeletePressed={handleDeletePressed}
        idTitle="Mã chức vụ"
        nameTitle="Tên chức vụ"
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chức vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col
            xs="auto"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '10px',
              paddingLeft: '10px',
              width: '100%',
            }}
          >
            <SmallTextInput
              type="normal"
              placeholder="Tên chức vụ"
              eyeVisible={false}
              disabled={false}
              onChange={(value) => setName(value)}
              value={name}
              passwordVisible={false}
              toggleVisible={() => {}}
            />
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <SmallMainButton
            title="Lưu"
            textColor={Color.white}
            backgroundColor={Color['light-blue']}
            onPressed={handleSavePressed}
          />
          <SmallMainButton
            title="Hủy"
            textColor={Color.white}
            backgroundColor={Color.pink}
            onPressed={handleModalClose}
          />
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteModalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa chức vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa chức vụ này?</span>
        </Modal.Body>
        <Modal.Footer>
          <SmallMainButton
            title="Xóa"
            textColor={Color.white}
            backgroundColor={Color['light-blue']}
            onPressed={handleDeleteOkPressed}
          />
          <SmallMainButton
            title="Hủy"
            textColor={Color.white}
            backgroundColor={Color.pink}
            onPressed={handleModalClose}
          />
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default AdminRole;
