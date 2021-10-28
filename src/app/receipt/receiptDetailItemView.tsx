import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { getProductDetailFromAPI } from '../../common/util/baseAPI';
import {
  initialProductItem,
  ProductItem,
  ReceiptDetailInterface,
} from '../../common/util/common';
import { NotifyType } from '../../common/util/enum';
import './style.scss';
import numeral from 'numeral';

interface Props {
  receiptDetail: ReceiptDetailInterface;
}
const ReceiptDetailItemView = (props: Props) => {
  const [product, setProduct] = useState<ProductItem>(initialProductItem);

  const getProductDetail = async () => {
    const productDetail = await getProductDetailFromAPI(
      props.receiptDetail.id_product
    );
    if (typeof productDetail !== 'string') {
      setProduct(productDetail);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy thông tin sản phẩm');
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [props.receiptDetail.id_receipt]);

  return (
    <Row style={{ maxHeight: '30vh' }}>
      <Col sm={2}>
        <img
          src={`data:image/png;base64,` + product.image}
          className="imgSmall"
          alt="product_small_image"
          width="40"
          height="40"
        />
      </Col>
      <Col
        sm={3}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{product.name}</span>
      </Col>
      <Col
        sm={3}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>
          {numeral(
            props.receiptDetail.price -
              (props.receiptDetail.price * props.receiptDetail.discount) / 100
          ).format(0, 0)}{' '}
          đ
        </span>
      </Col>
      <Col
        sm={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{props.receiptDetail.discount}%</span>
      </Col>
      <Col
        sm={1}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{props.receiptDetail.quantity}</span>
      </Col>
    </Row>
  );
};

export default ReceiptDetailItemView;
