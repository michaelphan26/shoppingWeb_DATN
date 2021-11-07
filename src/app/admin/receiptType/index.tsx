import React, { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
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
  adminAddReceiptTypeUrl,
  adminDeleteReceiptTypeUrl,
  adminEditReceiptTypeUrl,
  deleteJustName,
  editJustName,
  getReceiptTypeListFromAPI,
} from '../../../common/util/baseAPI';
import {
  initialJustNameItem,
  JustNameItemInterface,
} from '../../../common/util/common';
import { NotifyType, Url, Color } from '../../../common/util/enum';
import { RootState } from '../../../models/store';

const AdminReceiptType = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [receiptTypeList, setReceiptTypeList] = useState([] as any);
  const [receiptType, setReceiptType] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getReceiptTypeListAdmin = async () => {
    const receiptTypeListFromAPI = await getReceiptTypeListFromAPI();
    if (Object.keys(receiptTypeListFromAPI).length !== 0) {
      setReceiptTypeList(receiptTypeListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách loại hóa đơn');
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
      getReceiptTypeListAdmin();
    }
  }, []);

  const handleRefreshPressed = () => {
    getReceiptTypeListAdmin();
  };

  const handleAddPressed = () => {
    setReceiptType(initialJustNameItem);
    setName('');
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (item: JustNameItemInterface) => {
    setReceiptType(item);
    setName(item.name);
    setModalShow(true);
    setIsEditing(true);
  };

  const handleDeletePressed = (item: JustNameItemInterface) => {
    setReceiptType(item);
    setDeleteModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setDeleteModalShow(false);
    setReceiptType(initialJustNameItem);
    setName('');
    setIsEditing(false);
  };

  const handleSavePressed = async () => {
    if (isEditing) {
      if (name.trim().length > 1 && name.trim().length < 21) {
        receiptType.name = name.trim();
        const code = await editJustName(adminEditReceiptTypeUrl, receiptType);
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Chỉnh sửa loại hóa đơn thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Chỉnh sửa loại hóa đơn thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    } else {
      if (name.trim().length > 1 && name.trim().length < 21) {
        receiptType.name = name.trim();
        const code = await addJustName(adminAddReceiptTypeUrl, name.trim());
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm loại hóa đơn thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm loại hóa đơn thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    }
  };

  const handleDeleteOkPressed = async () => {
    const code = await deleteJustName(adminDeleteReceiptTypeUrl, receiptType);
    if (code === 200) {
      handleModalClose();
      toastNotify(NotifyType.success, 'Xóa loại hóa đơn thành công');
      handleRefreshPressed();
    } else {
      handleModalClose();
      toastNotify(NotifyType.error, 'Xóa loại hóa đơn thất bại');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý loại hóa đơn
      </h3>
      <Row style={{ marginBottom: '10px' }}>
        <Col sm={9} />
        <Col sm={3}>
          <ManageButtonsRow
            refreshButtonPressed={handleRefreshPressed}
            addButtonPressed={handleAddPressed}
          />
        </Col>
      </Row>
      <JustNameTable
        itemList={receiptTypeList}
        onEditPressed={handleEditPressed}
        onDeletePressed={handleDeletePressed}
        idTitle="Mã loại"
        nameTitle="Tên loại"
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin loại hóa đơn</Modal.Title>
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
              placeholder="Tên loại hóa đơn"
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
          <Modal.Title>Xóa loại hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa loại hóa đơn này?</span>
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

export default AdminReceiptType;
