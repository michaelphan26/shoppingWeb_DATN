import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AuthLayout from '../../../common/ui/layout/auth-layout';
import AuthCardView from '../../../common/ui/layout/auth-layout/components/authCardView';
import AuthImg from '../../../common/ui/assets/auth-image.jpg';
import './style.scss';

const Login = () => {
  return (
    <AuthLayout>
      <AuthCardView>
        <Row className="rowContainer">
          <Col sm="6">
            <img
              src={AuthImg}
              alt="auth_image"
              className="authImage"
              style={{ width: '100%', height: '50%' }}
            />
          </Col>
          <Col sm="6" className="loginContainer">
            <Row>
              <h3>Đăng nhập</h3>
            </Row>
          </Col>
        </Row>
      </AuthCardView>
    </AuthLayout>
  );
};

export default Login;
