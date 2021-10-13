import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AuthLayout from '../../../common/ui/layout/auth-layout';
import AuthCardView from '../../../common/ui/layout/auth-layout/components/authCardView';
import { Col, Row } from 'react-bootstrap';
import '../style.scss';
import { emailReg } from '../../../common/util/common';
import CheckBox from '../../../common/ui/base/checkbox';
import { MainButton } from '../../../common/ui/base/button';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { Link } from 'react-router-dom';
import AuthImg from '../../../common/ui/assets/auth-image.jpg';
import { Url, Color } from '../../../common/util/enum';

interface RegisterInfo {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  address: string;
}
const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [remember, setRemember] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibleToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCheckboxChange = () => {
    setRemember(!remember);
  };

  const handleLoginPress = async (registerInfo: RegisterInfo) => {
    // await axios({
    //   url: '/auth/login',
    //   baseURL: `${api_url}`,
    //   method: 'post',
    //   data: loginInfo,
    //   responseType: 'json',
    // }).then(() => {});
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
              style={{ width: '100%', height: '50%', alignSelf: 'center' }}
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

export default Register;
