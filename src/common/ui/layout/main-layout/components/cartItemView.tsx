import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CartItem } from '../../../../util/common';
import numeral from 'numeral';
import { RoundedQuantityButton } from '../../../base/button';
import {
  changeQuantity,
  removeFromCart,
} from '../../../../../models/cartReducers';
import { toastNotify } from '../../../base/toast/notify';
import { Color, NotifyType } from '../../../../util/enum';
import { getProductDetailFromAPI } from '../../../../util/baseAPI';
import { useHistory } from 'react-router-dom';
import Divider from '../../../base/divider';
import SmallMainButton from '../../../base/button/smallMainButton';
import { MdRemoveShoppingCart } from 'react-icons/md';

interface Props {
  cartItem: CartItem;
}
const CartItemView = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const increaseQuantity = () => {
    const newQuantity = props.cartItem.quantity + 1;
    if (newQuantity <= props.cartItem.stock) {
      dispatch(
        changeQuantity({
          item: props.cartItem,
          newQuantity: newQuantity,
        })
      );
    } else {
      toastNotify(NotifyType.warning, 'Số lượng sản phẩm không đủ');
    }
  };

  const decreaseQuantity = () => {
    const newQuantity = props.cartItem.quantity - 1;
    if (newQuantity > 0) {
      dispatch(
        changeQuantity({
          item: props.cartItem,
          newQuantity: newQuantity,
        })
      );
    } else {
      toastNotify(NotifyType.warning, 'Số lượng sản phẩm phải lớn hơn 0');
    }
  };

  const handleQuantityInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0 && props.cartItem.stock >= newQuantity) {
      dispatch(
        changeQuantity({
          item: props.cartItem,
          newQuantity: newQuantity,
        })
      );
    } else {
      toastNotify(NotifyType.warning, 'Số lượng sản phẩm không đủ');
    }
  };

  const handleGetProductDetail = async () => {
    const productDetailFromAPI = await getProductDetailFromAPI(
      props.cartItem.id_product
    );
    if (typeof productDetailFromAPI !== 'string') {
      history.push(`product/${props.cartItem.id_product}`, {
        productItem: productDetailFromAPI,
      });
    } else {
      toastNotify(NotifyType.error, 'Không thể tải thông tin sản phẩm');
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(props.cartItem));
  };

  return (
    <Row>
      <Col
        sm={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={'data:image/png;base64,' + props.cartItem.image}
          className="imgSmall"
          alt="logo"
          style={{ marginLeft: '5px' }}
        />
      </Col>
      <Col
        sm={7}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        onClick={handleGetProductDetail}
      >
        <Row>
          <span>{props.cartItem.name}</span>
          <span>{numeral(props.cartItem.price).format(0, 0)}đ</span>
          <span>Số lượng còn lại: {props.cartItem.stock}</span>
        </Row>
      </Col>
      <Col
        sm={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Row
          xs="auto"
          style={{
            marginTop: '8px',
            marginLeft: 'auto',
            marginRight: 'auto',
            verticalAlign: 'middle',
          }}
        >
          <Col>
            <RoundedQuantityButton type="minus" onPressed={decreaseQuantity} />
          </Col>
          <div>
            <input
              type="number"
              value={props.cartItem.quantity}
              onChange={handleQuantityInputChange}
              style={{
                border: 'none',
                textAlign: 'center',
                minWidth: '20px',
                maxWidth: '50px',
              }}
            />
          </div>
          <Col>
            <RoundedQuantityButton type="plus" onPressed={increaseQuantity} />
          </Col>
          <Row
            style={{
              marginTop: '8px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <SmallMainButton
              backgroundColor={Color['pink']}
              textColor={Color.white}
              title="Xóa"
              onPressed={handleRemoveFromCart}
            >
              <MdRemoveShoppingCart
                size={18}
                color="white"
                style={{ marginRight: 5 }}
              />
            </SmallMainButton>
          </Row>
        </Row>
      </Col>

      <Divider />
    </Row>
  );
};

export default CartItemView;
