import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  CompanyInterface,
  initialCompanyItem,
  initialProductItem,
  ioProductDetailItem,
  ProductItem,
} from '../../../../common/util/common';
import numeral from 'numeral';
import Divider from '../../../../common/ui/base/divider';

interface Props {
  ioDetail: ioProductDetailItem;
  productList: [];
  companyList: [];
}
const IODetailItemView = (props: Props) => {
  const [product, setProduct] = useState<ProductItem>(initialProductItem);
  const [company, setCompany] = useState<CompanyInterface>(initialCompanyItem);

  useEffect(() => {
    const productFound: ProductItem =
      props.productList.find((item: ProductItem) => {
        return item._id === props.ioDetail.id_product;
      }) ?? initialProductItem;
    setProduct(productFound);

    const companyFound: CompanyInterface =
      props.companyList.find((item: CompanyInterface) => {
        return item._id === props.ioDetail.id_company;
      }) ?? initialCompanyItem;
    setCompany(companyFound);
  });

  return (
    <Row style={{ maxHeight: '30vh' }}>
      <Col
        sm={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <img
          src={`data:image/png;base64,` + product.image}
          className="imgSmall"
          alt="product_small_image"
          width="50px"
          height="50px"
        />
      </Col>
      <Col
        sm={10}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <div>
          <span>Tên sản phẩm: {product.name}</span>
          <br />
          <span>Công ty: {company.name}</span>
          <br />
          <span>Giá: {numeral(props.ioDetail.price).format(0, 0)} đ</span>
          <br />
          <span>Số lượng: {props.ioDetail.quantity}</span>
        </div>
      </Col>
      <Divider />
    </Row>
  );
};

export default IODetailItemView;
