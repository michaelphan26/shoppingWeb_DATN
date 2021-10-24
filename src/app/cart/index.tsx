import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MainLayout from '../../common/ui/layout/main-layout';
import Divider from '../../common/ui/base/divider';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';
import numeral from 'numeral';
import './style.scss';
import { CartItem } from '../../common/util/common';
import CartItemView from '../../common/ui/layout/main-layout/components/cartItemView';
import SmallMainButton from '../../common/ui/base/button/smallMainButton';
import { Color, NotifyType } from '../../common/util/enum';
import { BsCheckLg } from 'react-icons/bs';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { useHistory } from 'react-router-dom';
import { addReceiptAPI } from '../../common/util/baseAPI';

interface Props {}
const Cart = (props: Props) => {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();

  const handleCartChecked = async () => {
    if (cart.productList.length === 0) {
      toastNotify(NotifyType.error, 'Giỏ hàng trống');
      return;
    }
    if (account.email === '') {
      history.push('/login', { checkingOut: true });
      toastNotify(NotifyType.error, 'Vui lòng đăng nhập để tiếp tục');
    } else {
      history.push('/checkout');
    }
  };

  async function pushToAPI() {
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
  }

  useEffect(() => {
    pushToAPI();
  }, [cart]);

  return (
    <MainLayout>
      <Row>
        <Col sm={7} className="roundedContainer">
          <h3 style={{ marginBottom: '30px' }}>Thông tin giỏ hàng</h3>
          {cart.productList.map((item: CartItem) => {
            return <CartItemView cartItem={item} key={item.id_product} />;
          })}
        </Col>
        <Col />
        <Col sm={4} className="roundedContainer">
          <h3 style={{ marginBottom: '30px' }}>Thành tiền</h3>
          <Row>
            <Row>
              <Col>
                <span>Số lượng sản phẩm: </span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <span>{cart.productList.length}</span>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col>
                <span>Chi phí vận chuyển: </span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                {numeral('0').format(0, 0)} đ
              </Col>
            </Row>

            <Divider />
            <Row>
              <Col>
                <span>Tổng chi phí: </span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <span>{numeral(cart.total).format(0, 0)} đ</span>
              </Col>
            </Row>

            <Divider />
            <Col
              style={{
                display: 'flex',
                justifyContent: 'right',
                marginTop: '5px',
                marginRight: '10px',
              }}
            >
              <SmallMainButton
                backgroundColor={Color['light-blue']}
                textColor={Color.white}
                title="Tiếp tục"
                onPressed={handleCartChecked}
              >
                <BsCheckLg size={18} color="white" style={{ marginRight: 5 }} />
              </SmallMainButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Cart;
