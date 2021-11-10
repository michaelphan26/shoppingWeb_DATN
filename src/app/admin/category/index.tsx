import React, { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { SmallMainButton } from '../../../common/ui/base/button';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import JustNameTable from '../../../common/ui/layout/admin-layout/components/justNameTable';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  adminAddCategoryUrl,
  adminDeleteCategoryUrl,
  adminEditCategoryUrl,
  editJustName,
  getCategoryListFromAPI,
  addJustName,
  deleteJustName,
} from '../../../common/util/baseAPI';
import {
  initialJustNameItem,
  JustNameItemInterface,
} from '../../../common/util/common';
import { Color, NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';

const AdminCategory = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([] as any);
  const [categoryItem, setCategoryItem] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getCategoryListAdmin = async () => {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (Object.keys(categoryListFromAPI).length !== 0) {
      setCategoryList(categoryListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách danh mục');
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
      getCategoryListAdmin();
    }
  }, []);

  const handleRefreshPressed = () => {
    getCategoryListAdmin();
  };

  const handleAddPressed = () => {
    setCategoryItem(initialJustNameItem);
    setName('');
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (item: JustNameItemInterface) => {
    setCategoryItem(item);
    setName(item.name);
    setModalShow(true);
    setIsEditing(true);
  };

  const handleDeletePressed = (item: JustNameItemInterface) => {
    setCategoryItem(item);
    setDeleteModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setDeleteModalShow(false);
    setCategoryItem(initialJustNameItem);
    setName('');
    setIsEditing(false);
  };

  const handleSavePressed = async () => {
    if (isEditing) {
      if (name.trim().length > 1 && name.trim().length < 21) {
        categoryItem.name = name.trim();
        const code = await editJustName(adminEditCategoryUrl, categoryItem);
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Chỉnh sửa danh mục thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Chỉnh sửa danh mục thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    } else {
      if (name.trim().length > 1 && name.trim().length < 21) {
        categoryItem.name = name.trim();
        const code = await addJustName(adminAddCategoryUrl, name.trim());
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm danh mục thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm danh mục thất bại');
        }
      } else {
        toastNotify(NotifyType.warning, 'Tên không hợp lệ');
      }
    }
  };

  const handleDeleteOkPressed = async () => {
    const code = await deleteJustName(adminDeleteCategoryUrl, categoryItem);
    if (code === 200) {
      handleModalClose();
      toastNotify(NotifyType.success, 'Xóa danh mục thành công');
      handleRefreshPressed();
    } else {
      handleModalClose();
      toastNotify(NotifyType.error, 'Xóa danh mục thất bại');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý danh mục
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
        itemList={categoryList}
        onEditPressed={handleEditPressed}
        onDeletePressed={handleDeletePressed}
        idTitle="Mã danh mục"
        nameTitle="Tên danh mục"
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin danh mục</Modal.Title>
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
              placeholder="Tên danh mục"
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
          <Modal.Title>Xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa danh mục này?</span>
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

export default AdminCategory;
