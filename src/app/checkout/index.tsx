import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import MainLayout from '../../common/ui/layout/main-layout';
import Divider from '../../common/ui/base/divider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models/store';
import numeral from 'numeral';
import './style.scss';
import { phoneReg, UserInfo } from '../../common/util/common';
import SmallMainButton from '../../common/ui/base/button/smallMainButton';
import { Color, NotifyType, Url } from '../../common/util/enum';
import { BsCheckLg } from 'react-icons/bs';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { useHistory } from 'react-router-dom';
import {
  addReceiptAPI,
  api_url,
  getUserInfoFromAPI,
} from '../../common/util/baseAPI';
import { Controller, useForm } from 'react-hook-form';
import { SmallTextInput } from '../../common/ui/base/textInput';
import axios from 'axios';
import { resetCart } from '../../models/cartReducers';

interface ConfirmInfo {
  name: string;
  phoneNumber: string;
  address: string;
  deliveryAddress: string;
}
interface Props {}
const Checkout = (props: Props) => {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const accountDetail = useSelector(
    (state: RootState) => state.accountDetailReducer
  );
  const account = useSelector((state: RootState) => state.accountReducer);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: accountDetail.name,
      phone: accountDetail.phone,
      address: accountDetail.address,
      deliveryAddress: '',
    },
  });
  const history = useHistory();
  const dispatch = useDispatch();

  async function pushToAPI() {
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
  }

  useEffect(() => {
    if (cart.productList.length === 0) {
      history.push(Url.Cart);
      toastNotify(NotifyType.error, 'Giỏ hàng trống');
    } else {
      pushToAPI();
    }
  }, [cart]);

  const handleConfirmChecked = async () => {
    if (account.email === '') {
      console.log('account');
      history.push('/login', { checkingOut: true });
      toastNotify(NotifyType.error, 'Vui lòng đăng nhập để tiếp tục');
    } else {
      const token = await window.sessionStorage.getItem('token');
      // await addReceiptAPI({
      //   productList: cart.productList,
      //   total: cart.total,
      // });
      if (token && account.email !== '') {
        await axios({
          url: `/receipt/receipt-checkout`,
          baseURL: `${api_url}`,
          method: 'post',
          headers: {
            'x-auth-token': token,
          },
          responseType: 'json',
        })
          .then((res) => {
            if (res.data['code'] === 200) {
              dispatch(resetCart());
              toastNotify(NotifyType.success, 'Đặt hàng thành công');
              history.push('/order-completed');
            } else {
              toastNotify(NotifyType.error, 'Đặt hàng thất bại');
            }
          })
          .catch((err) => {
            toastNotify(NotifyType.error, 'Xảy ra lỗi. Đặt hàng thất bại');
          });
      } else {
        toastNotify(NotifyType.error, 'Vui lòng đăng nhập để tiếp tục');
      }
    }
  };

  return (
    <MainLayout>
      <Row>
        <Col sm={7} className="roundedContainer">
          <h3 style={{ marginBottom: '30px' }}>Thông tin khách hàng</h3>
          <form onSubmit={handleSubmit(handleConfirmChecked)}>
            <Col
              xs="auto"
              style={{
                alignItems: 'center',
                paddingRight: '10px',
                paddingLeft: '10px',
                width: '100%',
              }}
            >
              <span>Họ tên</span>
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

              <span>Số điện thoại</span>
              <Controller
                control={control}
                rules={{ required: true, pattern: phoneReg }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="text"
                    placeholder="Số điện thoại"
                    onChange={onChange}
                    eyeVisible={false}
                    passwordVisible={false}
                    toggleVisible={() => {}}
                    value={value}
                    disabled={false}
                  />
                )}
                name="phone"
                defaultValue=""
              />
              {errors.phone && (
                <span className="errorText">
                  Số điện thoại không đúng định dạng
                </span>
              )}

              <span>Địa chỉ</span>
              <Controller
                control={control}
                rules={{ required: true, minLength: 5, maxLength: 100 }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="text"
                    placeholder="Địa chỉ khách hàng"
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

              <span>Địa chỉ giao hàng</span>
              <Controller
                control={control}
                rules={{ required: true, minLength: 5, maxLength: 100 }}
                render={({ field: { onChange, value } }) => (
                  <SmallTextInput
                    type="text"
                    placeholder="Địa chỉ giao hàng"
                    onChange={onChange}
                    eyeVisible={false}
                    passwordVisible={false}
                    toggleVisible={() => {}}
                    value={value}
                    disabled={false}
                  />
                )}
                name="deliveryAddress"
                defaultValue=""
              />
              {errors.deliveryAddress && (
                <span className="errorText">Địa chỉ không đúng</span>
              )}
            </Col>
          </form>
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
            <Col>
              <span>Phương thức thanh toán</span>
            </Col>

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
                onPressed={handleConfirmChecked}
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

export default Checkout;
