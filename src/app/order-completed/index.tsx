import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toastNotify } from '../../common/ui/base/toast/notify';
import MainLayout from '../../common/ui/layout/main-layout';
import { NotifyType, Url } from '../../common/util/enum';
import { RootState } from '../../models/store';
import { Color } from '../../common/util/enum';
import { MainButton } from '../../common/ui/base/button';
import SmallAuthCardView from '../../common/ui/layout/auth-layout/components/smallAuthCardView';
import { resetCart } from '../../models/cartReducers';

const OrderCompleted = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.productList.length === 0) {
      history.goBack();
      toastNotify(NotifyType.error, 'Giỏ hàng trống');
    }
  }, [cart, history]);

  return (
    <MainLayout>
      <SmallAuthCardView>
        <Row
          xs="auto"
          style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Col>
            <BsFillCheckCircleFill size={100} color={Color['light-blue']} />
            <h3 style={{ marginTop: '20px' }}>Đặt hàng thành công</h3>
            <Row style={{ justifyContent: 'center' }}>
              <MainButton
                backgroundColor={Color['light-blue']}
                textColor="white"
                title="Quay về trang chủ"
                onPressed={() => {
                  dispatch(resetCart());
                  history.push(Url.Home);
                }}
              >
                <></>
              </MainButton>
            </Row>
          </Col>
        </Row>
      </SmallAuthCardView>
    </MainLayout>
  );
};

export default OrderCompleted;
