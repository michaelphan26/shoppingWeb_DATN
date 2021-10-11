import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from '../../common/ui/layout/main-layout';
import ProductCardItem from '../../common/ui/layout/main-layout/components/productCardItem';
import { getProductListFromAPI } from '../../common/util/baseAPI';
import { ProductItem } from '../../common/util/common';
import './style.scss';
import { toastNotify } from '../../common/ui/base/toast/notify';

const Menu = () => {
  const [productList, setProductList] = useState([] as any);

  const getProductList = async () => {
    const productListFromAPI = await getProductListFromAPI();
    if (Object.keys(productListFromAPI).length !== 0) {
      setProductList(productListFromAPI);
    } else {
      toastNotify('error', 'Không thể lấy danh sách sản phẩm');
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <MainLayout>
      <Container className="titleContainer">
        <h1>----- Sản phẩm nổi bật -----</h1>
      </Container>
      <Row>
        {productList.map((item: ProductItem) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCardItem productItem={item} />
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Menu;
