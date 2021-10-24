import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from '../../common/ui/layout/main-layout';
import ProductCardItem from '../../common/ui/layout/main-layout/components/productCardItem';
import { getProductListFromAPI } from '../../common/util/baseAPI';
import { ProductItem } from '../../common/util/common';
import './style.scss';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { NotifyType } from '../../common/util/enum';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<any> {}
const Search = (props: Props) => {
  const [productList, setProductList] = useState([] as any);
  const searchText = props.location.search.replace('?', '') || '';

  const getProductList = async () => {
    const productListFromAPI = await getProductListFromAPI();
    if (Object.keys(productListFromAPI).length !== 0) {
      const productListTemp = productListFromAPI.filter(
        (item: ProductItem) =>
          item.name.toLowerCase().startsWith(searchText) ||
          item.brand.toLowerCase().startsWith(searchText)
      );
      setProductList(productListTemp);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách sản phẩm');
    }
  };

  useEffect(() => {
    getProductList();
  }, [searchText]);

  return (
    <MainLayout>
      <Container style={{ textAlign: 'left' }}>
        <h3>Tìm thấy {productList.length} sản phẩm</h3>
      </Container>
      <Row>
        {productList.map((item: ProductItem) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <ProductCardItem productItem={item} />
            </Col>
          );
        })}
      </Row>
    </MainLayout>
  );
};

export default Search;
