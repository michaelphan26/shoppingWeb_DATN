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
  adminAddIOTypeUrl,
  adminDeleteIOTypeUrl,
  adminEditIOTypeUrl,
  deleteJustName,
  editJustName,
  getIOTypeListFromAPI,
} from '../../../common/util/baseAPI';
import {
  initialJustNameItem,
  JustNameItemInterface,
} from '../../../common/util/common';
import { Color, NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';

const AdminIOType = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [ioTypeList, setIOTypeList] = useState([] as any);
  const [ioType, setIOType] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getIOTypeListAdmin = async () => {
    const ioTypeListFromAPI = await getIOTypeListFromAPI();
    if (Object.keys(ioTypeListFromAPI).length !== 0) {
      setIOTypeList(ioTypeListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách loại nhập xuất');
    }
  };

  useEffect(() => {
    getIOTypeListAdmin();
  }, []);

  const handleRefreshPressed = () => {
    getIOTypeListAdmin();
  };

  const handleAddPressed = () => {
    setIOType(initialJustNameItem);
    setName('');
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (item: JustNameItemInterface) => {
    setIOType(item);
    setName(item.name);
    setModalShow(true);
    setIsEditing(true);
  };

  const handleDeletePressed = (item: JustNameItemInterface) => {
    setIOType(item);
    setDeleteModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setDeleteModalShow(false);
    setIOType(initialJustNameItem);
    setName('');
    setIsEditing(false);
  };

  const handleSavePressed = async () => {
    if (isEditing) {
      if (name.trim().length > 1 && name.trim().length < 21) {
        ioType.name = name.trim();
        const code = await editJustName(adminEditIOTypeUrl, ioType);
        if (code === 200) {
          handleModalClose();
          toastNotify(
            NotifyType.success,
            'Chỉnh sửa loại nhập xuất thành công'
          );
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Chỉnh sửa loại nhập xuất thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    } else {
      if (name.trim().length > 1 && name.trim().length < 21) {
        ioType.name = name.trim();
        const code = await addJustName(adminAddIOTypeUrl, name.trim());
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm loại nhập xuất thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm loại nhập xuất thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    }
  };

  const handleDeleteOkPressed = async () => {
    const code = await deleteJustName(adminDeleteIOTypeUrl, ioType);
    if (code === 200) {
      handleModalClose();
      toastNotify(NotifyType.success, 'Xóa loại nhập xuất thành công');
      handleRefreshPressed();
    } else {
      handleModalClose();
      toastNotify(NotifyType.error, 'Xóa loại nhập xuất thất bại');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý loại nhập xuất
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
        itemList={ioTypeList}
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
          <Modal.Title>Thông tin loại nhập xuất</Modal.Title>
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
              placeholder="Tên loại nhập xuất"
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
          <Modal.Title>Xóa loại nhập xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa loại nhập xuất này?</span>
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

export default AdminIOType;
