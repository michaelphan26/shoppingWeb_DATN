import React, { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { SmallMainButton } from '../../../common/ui/base/button';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import DropdownList from 'react-widgets/DropdownList';
import 'react-widgets/styles.css';
import './style.scss';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  addUserToAPI,
  editUserAPI,
  getRoleFromAPI,
  getUserDetailListFromAPI,
  getUserListFromAPI,
} from '../../../common/util/baseAPI';
import {
  initialUserDetailInterface,
  initialUserAPIInterface,
  emailReg,
  phoneReg,
  UserDetailInterface,
  UserInterface,
  UserAPIInterface,
  initialUserInterface,
} from '../../../common/util/common';
import { Color, NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';
import UserTable from './components/userTable';

const AdminUser = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: initialUserAPIInterface,
  });
  const [user, setUser] = useState<UserInterface>(initialUserInterface);
  const [userList, setUserList] = useState([] as any);
  const [userDetailList, setUserDetailList] = useState([] as any);
  const [userDetail, setUserDetail] = useState<UserDetailInterface>(
    initialUserDetailInterface
  );
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [roleList, setRoleList] = useState([] as any);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  const getUserListAdmin = async () => {
    const userListFromAPI = await getUserListFromAPI();
    if (Object.keys(userListFromAPI).length !== 0) {
      setUserList(userListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách tài khoản');
    }
  };

  const getUserDetailListAdmin = async () => {
    const userDetailListFromAPI = await getUserDetailListFromAPI();
    if (Object.keys(userDetailListFromAPI).length !== 0) {
      setUserDetailList(userDetailListFromAPI);
    } else {
      toastNotify(
        NotifyType.error,
        'Không thể lấy danh sách thông tin tài khoản'
      );
    }
  };

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
      getUserListAdmin();
      getUserDetailListAdmin();
      getRoleListAdmin();
    }
  }, []);

  const resetValue = (item: UserAPIInterface) => {
    reset(item);
    clearErrors();
  };

  const handleRefreshPressed = () => {
    getUserListAdmin();
    getUserDetailListAdmin();
  };

  const handleAddPressed = () => {
    setUser(initialUserInterface);
    setUserDetail(initialUserDetailInterface);
    resetValue(initialUserAPIInterface);
    setModalShow(true);
    setIsEditing(false);
  };

  const handleEditPressed = (
    user: UserInterface,
    userDetail: UserDetailInterface
  ) => {
    setUser(user);
    setUserDetail(userDetail);
    resetValue({
      email: user.email,
      password: '',
      name: userDetail.name,
      phone: userDetail.phone,
      address: userDetail.address,
      id_role: { _id: user.id_role, name: user.role_name },
    });
    setModalShow(true);
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setUser(initialUserInterface);
    setModalShow(false);
    setUserDetail(initialUserDetailInterface);
    setIsEditing(false);
    resetValue(initialUserDetailInterface);
  };

  const handleSavePressed = async (userInfo: UserAPIInterface) => {
    if (isCanceled) {
      handleModalClose();
      setIsCanceled(false);
    } else {
      if (isEditing) {
        delete userInfo.email;
        delete userInfo.password;
        const id_role = userInfo.id_role._id;
        userInfo.id_role = id_role;
        const code = await editUserAPI(user._id, userInfo);
        if (code === 200) {
          handleModalClose();
          toastNotify(
            NotifyType.success,
            'Chỉnh sửa thông tin tài khoản thành công'
          );
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(
            NotifyType.error,
            'Chỉnh sửa thông tin tài khoản thất bại'
          );
        }
      } else {
        const id_role = userInfo.id_role._id;
        userInfo.id_role = id_role;
        delete userInfo._id;
        delete userInfo.joinDate;
        console.log(userInfo);
        const code = await addUserToAPI(userInfo);
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm tài khoản thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm tài khoản thất bại');
        }
      }
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý tài khoản
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
      <UserTable
        userList={userList}
        userDetailList={userDetailList}
        roleList={roleList}
        onEditPressed={handleEditPressed}
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin tài khoản</Modal.Title>
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
                  rules={{ required: true, pattern: emailReg }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Email"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={isEditing ? true : false}
                      value={value}
                    />
                  )}
                  name="email"
                  defaultValue=""
                />
                {errors.email && (
                  <span className="errorText">Email không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{
                    required: isEditing ? false : true,
                    minLength: 8,
                    maxLength: 30,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Mật khẩu"
                      onChange={onChange}
                      eyeVisible={true}
                      passwordVisible={passwordVisible}
                      toggleVisible={() => setPasswordVisible(!passwordVisible)}
                      disabled={isEditing ? true : false}
                      value={value}
                    />
                  )}
                  name="password"
                  defaultValue=""
                />
                {errors.password && (
                  <span className="errorText">Mật khẩu không đúng</span>
                )}

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
                  rules={{ required: true, minLength: 5, maxLength: 200 }}
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
                  rules={{ required: true, minLength: 2, maxLength: 200 }}
                  render={({ field: { value, onChange } }) => (
                    <DropdownList
                      data={roleList}
                      dataKey="_id"
                      textField="name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  name="id_role"
                  defaultValue=""
                />
                {errors.id_role && (
                  <span className="errorText">Chưa chọn chức vụ</span>
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
    </AdminLayout>
  );
};

export default AdminUser;
