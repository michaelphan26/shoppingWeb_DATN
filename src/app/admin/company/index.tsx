import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { SmallMainButton } from '../../../common/ui/base/button';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import CompanyTable from './components/companyTable';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  addCompanyToAPI,
  deleteCompany,
  editCompanyAPI,
  getCompanyListFromAPI,
} from '../../../common/util/baseAPI';
import {
  CompanyInterface,
  initialCompanyItem,
  phoneReg,
} from '../../../common/util/common';
import { Color, NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';

const AdminCompany = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [companyList, setCompanyList] = useState([] as any);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: initialCompanyItem,
  });
  const [company, setCompany] = useState<CompanyInterface>(initialCompanyItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  const getCompanyListAdmin = async () => {
    const companyListFromAPI = await getCompanyListFromAPI();
    if (Object.keys(companyListFromAPI).length !== 0) {
      setCompanyList(companyListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách đối tác');
    }
  };

  useEffect(() => {
    getCompanyListAdmin();
  }, []);

  const resetValue = (item: CompanyInterface) => {
    reset(item);
    clearErrors();
  };

  const handleRefreshPressed = () => {
    getCompanyListAdmin();
  };

  const handleAddPressed = () => {
    setCompany(initialCompanyItem);
    resetValue(initialCompanyItem);
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (item: CompanyInterface) => {
    setCompany(item);
    resetValue(item);
    setModalShow(true);
    setIsEditing(true);
  };

  const handleDeletePressed = (item: CompanyInterface) => {
    setCompany(item);
    setDeleteModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setDeleteModalShow(false);
    setCompany(initialCompanyItem);
    setIsEditing(false);
    resetValue(initialCompanyItem);
  };

  const handleSavePressed = async (companyInfo: CompanyInterface) => {
    if (isCanceled) {
      handleModalClose();
      setIsCanceled(false);
    } else {
      if (isEditing) {
        delete companyInfo._id;
        delete companyInfo.__v;
        const code = await editCompanyAPI(company._id, companyInfo);
        if (code === 200) {
          handleModalClose();
          toastNotify(
            NotifyType.success,
            'Chỉnh sửa thông tin đối tác thành công'
          );
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Chỉnh sửa thông tin đối tác thất bại');
        }
      } else {
        delete companyInfo._id;
        const code = await addCompanyToAPI(companyInfo);
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm đối tác thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm đối tác thất bại');
        }
      }
    }
  };

  const handleDeleteOkPressed = async () => {
    const code = await deleteCompany(company._id);
    if (code === 200) {
      handleModalClose();
      toastNotify(NotifyType.success, 'Xóa đối tác thành công');
      handleRefreshPressed();
    } else {
      handleModalClose();
      toastNotify(NotifyType.error, 'Xóa đối tác thất bại');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý đối tác
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
      <CompanyTable
        itemList={companyList}
        onEditPressed={handleEditPressed}
        onDeletePressed={handleDeletePressed}
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đối tác</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleSavePressed)}>
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
              <Row style={{ width: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 50 }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Tên"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="name"
                  defaultValue=""
                />
                {errors.name && (
                  <span className="errorText">Tên không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 200 }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Địa chỉ"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="address"
                  defaultValue=""
                />
                {errors.address && (
                  <span className="errorText">Địa chỉ không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, pattern: phoneReg }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Số điện thoại"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="phone"
                  defaultValue=""
                />
                {errors.phone && (
                  <span className="errorText">SĐT không đúng</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 50 }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Mã số thuế"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="tax_number"
                  defaultValue=""
                />
                {errors.tax_number && (
                  <span className="errorText">MST không hợp lệ</span>
                )}
              </Row>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <SmallMainButton
              title="Lưu"
              textColor={Color.white}
              backgroundColor={Color['light-blue']}
              onPressed={() => {}}
            />
            <SmallMainButton
              title="Hủy"
              textColor={Color.white}
              backgroundColor={Color.pink}
              onPressed={handleModalClose}
            />
          </Modal.Footer>
        </form>
      </Modal>
      <Modal
        show={deleteModalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa đối tác</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa đối tác này?</span>
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

export default AdminCompany;
