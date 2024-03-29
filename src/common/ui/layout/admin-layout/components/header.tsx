import React, { useState, useRef } from 'react';
import {
  Navbar,
  NavDropdown,
  Col,
  Row,
  Modal,
  Container,
  Nav,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { accountLogout } from '../../../../../models/accountReducers';
import { RootState } from '../../../../../models/store';
import { NotifyType, Url } from '../../../../util/enum';
import { toastNotify } from '../../../base/toast/notify';
import axios from 'axios';
import SmallMainButton from '../../../base/button/smallMainButton';
import '../style.scss';
import { SmallTextInput } from '../../../base/textInput';
import { Color } from '../../../../util/enum';
import { api_url } from '../../../../util/baseAPI';

interface ChangePasswordInfo {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const Header = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm({ reValidateMode: 'onSubmit' });
  const [oldPasswordVisible, setOldPasswordVisible] = useState<boolean>(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const oldPassword = useRef();
  oldPassword.current = watch('oldPassword', '');
  const newPassword = useRef();
  newPassword.current = watch('newPassword', '');
  const dispatch = useDispatch();
  const history = useHistory();

  const resetValue = () => {
    setOldPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmPasswordVisible(false);
    clearErrors();
    setValue('oldPassword', '');
    setValue('newPassword', '');
    setValue('confirmNewPassword', '');
  };

  const handleLogout = () => {
    dispatch(accountLogout({}));
    window.sessionStorage.setItem('@token', '');
    toastNotify(NotifyType.success, 'Đăng xuất thành công');
    history.push(Url.Home);
  };

  const handleSubmitChangePassword = async (
    passwordInfo: ChangePasswordInfo
  ) => {
    const token = await window.sessionStorage.getItem('token');
    if (token && account.email !== '') {
      await axios({
        url: 'auth/change-password',
        baseURL: `${api_url}`,
        method: 'post',
        responseType: 'json',
        headers: {
          'x-auth-token': token,
        },
        data: passwordInfo,
      })
        .then((res) => {
          if (res.data['code'] === 200) {
            toastNotify(NotifyType.success, 'Thay đổi mật khẩu thành công');
          } else {
            toastNotify(NotifyType.success, 'Thay đổi mật khẩu thất bại');
          }
          setModalShow(false);
          resetValue();
        })
        .catch((err) => {
          //Toast err
          toastNotify(NotifyType.success, 'Không thể thay đổi mật khẩu');
          setModalShow(false);
          resetValue();
        });
    }
  };

  const handleOldPasswordVisibleToggle = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const handleNewPasswordVisibleToggle = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleConfirmPasswordVisibleToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleModalOpen = () => {
    setModalShow(true);
  };

  return (
    <div className="header">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="shadow-sm py-3 px-4 bg-dark"
      >
        <Navbar.Brand>
          <div style={{ width: '20px' }}></div>
        </Navbar.Brand>
        <Navbar.Brand href={`${Url.AdminDashboard}`}>Admin</Navbar.Brand>
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <>
                    <FaUserAlt
                      size={14}
                      style={{ marginRight: 6 }}
                      color="white"
                    />
                    <span style={{ color: 'white' }}>Hi, {account.email}</span>{' '}
                  </>
                }
                id="dropdown-menu-right pull-right"
              >
                <NavDropdown.Item onClick={handleModalOpen}>
                  Đổi mật khẩu
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleSubmitChangePassword)}>
            <Row
              style={{
                width: '80%',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Controller
                control={control}
                rules={{ required: true, minLength: 8, maxLength: 30 }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="password"
                    placeholder="Mật khẩu cũ"
                    onChange={onChange}
                    eyeVisible={true}
                    passwordVisible={oldPasswordVisible}
                    toggleVisible={handleOldPasswordVisibleToggle}
                    disabled={false}
                    value={value}
                  />
                )}
                name="oldPassword"
                defaultValue=""
              />
              {errors.oldPassword && (
                <span className="errorText">Mật khẩu có độ dài 8-30 kí tự</span>
              )}

              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                  maxLength: 30,
                  validate: (value) => value !== oldPassword.current,
                }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="password"
                    placeholder="Mật khẩu mới"
                    onChange={onChange}
                    eyeVisible={true}
                    passwordVisible={newPasswordVisible}
                    toggleVisible={handleNewPasswordVisibleToggle}
                    disabled={false}
                    value={value}
                  />
                )}
                name="newPassword"
                defaultValue=""
              />
              {errors.newPassword && (
                <span className="errorText">Mật khẩu có độ dài 8-30 kí tự</span>
              )}

              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                  maxLength: 30,
                  validate: (value) => value === newPassword.current,
                }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="password"
                    placeholder="Nhập lại"
                    onChange={onChange}
                    eyeVisible={true}
                    passwordVisible={confirmPasswordVisible}
                    toggleVisible={handleConfirmPasswordVisibleToggle}
                    disabled={false}
                    value={value}
                  />
                )}
                name="confirmPassword"
                defaultValue=""
              />
              {errors.confirmPassword && (
                <span className="errorText">Mật khẩu không giống nhau</span>
              )}
            </Row>

            <Row
              xs={6}
              style={{ justifyContent: 'right', paddingRight: '20px' }}
            >
              <SmallMainButton
                backgroundColor={Color.pink}
                textColor="white"
                title="Hủy"
                onPressed={() => {
                  handleModalClose();
                }}
              >
                <></>
              </SmallMainButton>
              <Col style={{ width: '10px' }} />
              <SmallMainButton
                backgroundColor={Color['light-blue']}
                textColor="white"
                title="Lưu"
                onPressed={() => {}}
              >
                <></>
              </SmallMainButton>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
