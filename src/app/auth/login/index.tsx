import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AuthLayout from '../../../common/ui/layout/auth-layout';
import AuthCardView from '../../../common/ui/layout/auth-layout/components/authCardView';
import AuthImg from '../../../common/ui/assets/auth-image.jpg';
import '../style.scss';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MainButton } from '../../../common/ui/base/button';
import { Color, NotifyType } from '../../../common/util/enum';
import { Controller, useForm } from 'react-hook-form';
import { emailReg } from '../../../common/util/common';
import axios from 'axios';
import { api_url } from '../../../common/util/baseAPI';
import CheckBox from '../../../common/ui/base/checkbox';
import { Url } from '../../../common/util/enum';
import { useDispatch } from 'react-redux';
import { accountLogin } from '../../../models/accountReducers';
import { toastNotify } from '../../../common/ui/base/toast/notify';

interface LoginInfo {
  email: string;
  password: string;
}
interface Props extends RouteComponentProps<any> {}
const Login = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [remember, setRemember] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const checkingOut = props.location.state || false;
  const dispatch = useDispatch();

  const handlePasswordVisibleToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCheckboxChange = () => {
    setRemember(!remember);
  };

  const handleLoginPress = async (loginInfo: LoginInfo) => {
    await axios({
      url: '/auth/login',
      baseURL: `${api_url}`,
      method: 'post',
      data: loginInfo,
      responseType: 'json',
    })
      .then(async (res) => {
        if (res.data['code'] === 200) {
          dispatch(accountLogin(res.data['data']));
          if (remember) {
            await localStorage.setItem(
              'token',
              res.headers['x-auth-token'] as string
            );
            await window.sessionStorage.setItem(
              'token',
              res.headers['x-auth-token'] as string
            );
          } else {
            await window.sessionStorage.setItem(
              'token',
              res.headers['x-auth-token'] as string
            );
          }
          if (checkingOut) {
            props.history.push('/checkout');
          } else {
            props.history.push(Url.Home);
          }
        } else {
          toastNotify(NotifyType.error, 'Tài khoản hoặc mật khẩu không đúng');
        }
      })
      .catch((err) => {
        toastNotify(NotifyType.error, 'Tài khoản hoặc mật khẩu không đúng');
      });
  };

  return (
    <AuthLayout>
      <AuthCardView>
        <Row className="rowContainer">
          <Col sm="6" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={AuthImg}
              alt="auth_image"
              className="authImage"
              style={{ width: '100%', height: '60%', alignSelf: 'center' }}
            />
          </Col>
          <Col sm="6" className="loginContainer">
            <form onSubmit={handleSubmit(handleLoginPress)}>
              <Row style={{ alignItems: 'center', padding: 0, width: '80%' }}>
                <h3 style={{ marginBottom: '30px' }}>Đăng nhập</h3>
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
                      defaultText=""
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
                      defaultText=""
                    />
                  )}
                  name="password"
                  defaultValue=""
                />
                {errors.password && (
                  <span className="errorText">
                    Mật khẩu có độ dài 8-30 kí tự
                  </span>
                )}

                <CheckBox
                  title="Nhớ thông tin"
                  checked={remember}
                  onChange={handleCheckboxChange}
                />

                <p style={{ marginTop: 10 }}>
                  Chưa có tài khoản?{' '}
                  <Link
                    to={Url.Register}
                    className="registerText"
                    style={{ marginLeft: 10 }}
                  >
                    Đăng ký ngay
                  </Link>
                </p>
                <div>
                  <MainButton
                    backgroundColor={Color['light-blue']}
                    textColor="white"
                    title="Đăng nhập"
                    onPressed={() => {}}
                  >
                    <></>
                  </MainButton>
                </div>
              </Row>
            </form>
          </Col>
        </Row>
      </AuthCardView>
    </AuthLayout>
  );
};

export default Login;
