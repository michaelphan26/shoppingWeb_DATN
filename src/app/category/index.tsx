import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Divider from '../../common/ui/base/divider';
import { toastNotify } from '../../common/ui/base/toast/notify';
import MainLayout from '../../common/ui/layout/main-layout';
import {
  getCategoryListFromAPI,
  getProductByCategoryFromAPI,
} from '../../common/util/baseAPI';
import { JustNameItemInterface, ProductItem } from '../../common/util/common';
import { NotifyType } from '../../common/util/enum';
import CategoryItemView from './components/categoryItemView';
import ProductCategoryItem from '../../common/ui/layout/main-layout/components/productCategoryItem';

const Category = () => {
  const [categoryList, setCategoryList] = useState([] as any);
  const [productList, setProductList] = useState([] as any);
  const history = useHistory();
  const categoryId =
    history.location.search.slice(4, history.location.search.length) || '';
  console.log(categoryId);

  const getCategoryList = async () => {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (Object.keys(categoryListFromAPI).length !== 0) {
      setCategoryList(categoryListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách danh mục');
    }
  };

  const getProductListByCategoryId = async () => {
    const productListByCategory = await getProductByCategoryFromAPI(categoryId);
    if (Object.keys(productListByCategory).length !== 0) {
      setProductList(productListByCategory);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách sản phẩm');
    }
  };

  useEffect(() => {
    if (categoryId) {
      getCategoryList();
      getProductListByCategoryId();
    } else getCategoryList();
  }, [categoryId]);

  return (
    <MainLayout>
      <Row>
        <Col
          sm={3}
          className="roundedContainer"
          style={{ padding: '10px', height: '75vh' }}
        >
          <h4>Danh mục</h4>
          <Divider />
          <Row>
            {categoryList.map((item: JustNameItemInterface) => {
              return <CategoryItemView item={item} />;
            })}
          </Row>
        </Col>
        <Col sm={1} />
        <Col
          sm={8}
          className="roundedContainer"
          style={{ padding: '10px', height: '75vh' }}
        >
          <h4 style={{ marginLeft: '10px' }}>Sản phẩm</h4>
          <div style={{ height: '10px' }} />
          <Row>
            {productList.map((item: ProductItem) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <ProductCategoryItem productItem={item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Category;
