import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AuthLayout from '../../../common/ui/layout/auth-layout';
import AuthCardView from '../../../common/ui/layout/auth-layout/components/authCardView';
import { Col, Row } from 'react-bootstrap';
import '../style.scss';
import { emailReg, phoneReg } from '../../../common/util/common';
import CheckBox from '../../../common/ui/base/checkbox';
import { MainButton } from '../../../common/ui/base/button';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { Link, RouteComponentProps } from 'react-router-dom';
import AuthImg from '../../../common/ui/assets/auth-image.jpg';
import { Url, Color, NotifyType } from '../../../common/util/enum';
import axios from 'axios';
import { api_url } from '../../../common/util/baseAPI';
import { useDispatch } from 'react-redux';
import { accountLogin } from '../../../models/accountReducers';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import { ToastContainer } from 'react-toastify';

interface RegisterInfo {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  address: string;
}
interface Props extends RouteComponentProps<any> {}
const Register = (props: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const password = useRef();
  password.current = watch('password', '');
  const confirmPassword = useRef();
  confirmPassword.current = watch('confirmPassword', '');
  const dispatch = useDispatch();

  const handlePasswordVisibleToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibleToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegisterPress = async (registerInfo: RegisterInfo) => {
    await axios({
      url: '/auth/register',
      baseURL: `${api_url}`,
      method: 'post',
      data: {
        name: registerInfo.name,
        email: registerInfo.email,
        password: registerInfo.password,
        phone: registerInfo.phoneNumber,
        address: registerInfo.address,
      },
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          dispatch(accountLogin(res.data['data']));
          window.sessionStorage.setItem('token', res.headers['x-auth-token']);
          password.current = undefined;
          confirmPassword.current = undefined;
          props.history.push(Url.Home);
          toastNotify(NotifyType.success, 'Đăng ký tài khoản thành công');
        } else {
          toastNotify(NotifyType.error, 'Đăng ký tài khoản thất bại');
        }
      })
      .catch((err) => {
        toastNotify(NotifyType.error, 'Đăng ký tài khoản thất bại');
      });
  };

  return (
    <AuthLayout>
      <AuthCardView>
        <form
          className="registerRowContainer"
          onSubmit={handleSubmit(handleRegisterPress)}
        >
          <Row
            style={{
              alignItems: 'center',
              padding: 10,
              width: '80%',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <h3 style={{ marginBottom: '30px' }}>Đăng ký</h3>
            <Controller
              control={control}
              rules={{ required: true, pattern: emailReg }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="text"
                  placeholder="Địa chỉ email"
                  onChange={onChange}
                  eyeVisible={false}
                  passwordVisible={false}
                  toggleVisible={() => {}}
                  value={value}
                  disabled={false}
                />
              )}
              name="email"
              defaultValue=""
            />
            {errors.email && (
              <span className="errorText">Email không đúng định dạng</span>
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 8, maxLength: 30 }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={onChange}
                  eyeVisible={true}
                  passwordVisible={passwordVisible}
                  toggleVisible={handlePasswordVisibleToggle}
                  value={value}
                  disabled={false}
                />
              )}
              name="password"
              defaultValue=""
            />
            {errors.password && (
              <span className="errorText">Mật khẩu có độ dài 8-30 kí tự</span>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                maxLength: 30,
                validate: (value) => value === password.current,
              }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  onChange={onChange}
                  eyeVisible={true}
                  passwordVisible={confirmPasswordVisible}
                  toggleVisible={handleConfirmPasswordVisibleToggle}
                  value={value}
                  disabled={false}
                />
              )}
              name="confirmPassword"
              defaultValue=""
            />
            {errors.confirmPassword && (
              <span className="errorText">Mật khẩu không khớp</span>
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 2, maxLength: 50 }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="text"
                  placeholder="Họ tên"
                  onChange={onChange}
                  eyeVisible={false}
                  passwordVisible={false}
                  toggleVisible={() => {}}
                  value={value}
                  disabled={false}
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors.name && <span className="errorText">Tên không đúng</span>}

            <Controller
              control={control}
              rules={{
                required: true,
                pattern: phoneReg,
                minLength: 10,
                maxLength: 11,
              }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="number"
                  placeholder="Số điện thoại"
                  onChange={onChange}
                  eyeVisible={false}
                  passwordVisible={false}
                  toggleVisible={() => {}}
                  value={value}
                  disabled={false}
                />
              )}
              name="phoneNumber"
              defaultValue=""
            />
            {errors.phoneNumber && (
              <span className="errorText">
                Số điện thoại không đúng định dạng
              </span>
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 5, maxLength: 100 }}
              render={({ field: { onChange, value } }) => (
                <SmallTextInput
                  type="text"
                  placeholder="Địa chỉ"
                  onChange={onChange}
                  eyeVisible={false}
                  passwordVisible={false}
                  toggleVisible={() => {}}
                  value={value}
                  disabled={false}
                />
              )}
              name="address"
              defaultValue=""
            />
            {errors.address && (
              <span className="errorText">Địa chỉ không đúng</span>
            )}

            <p style={{ marginTop: 10 }}>
              Đã có tài khoản?{' '}
              <Link
                to={Url.Login}
                className="registerText"
                style={{ marginLeft: 10 }}
              >
                Đăng nhập ngay
              </Link>
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <MainButton
                backgroundColor={Color['light-blue']}
                textColor="white"
                title="Đăng ký"
                onPressed={() => {}}
              >
                <></>
              </MainButton>
            </div>
          </Row>
        </form>
        <ToastContainer />
      </AuthCardView>
    </AuthLayout>
  );
};

export default Register;
