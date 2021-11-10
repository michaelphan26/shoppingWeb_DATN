import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import DropdownList from 'react-widgets/esm/DropdownList';
import { SmallMainButton } from '../../../common/ui/base/button';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import { getProductListAdminFromAPI } from '../../../common/util/baseAPI';
import { initialProductItem, ProductItem } from '../../../common/util/common';
import { NotifyType, Color } from '../../../common/util/enum';
import ProductTable from './productTable';

const AdminProduct = () => {
  const [productList, setProductList] = useState([] as any);
  const statusList = [
    { label: 'Đang kinh doanh', value: 'true' },
    { label: 'Ngừng kinh doanh', value: 'false' },
  ] as [];
  const [modalShow, setModalShow] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  const getProductListAdmin = async () => {
    const productListFromAPI = await getProductListAdminFromAPI();
    if (Object.keys(productListFromAPI).length !== 0) {
      setProductList(productListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách sản phẩm');
    }
  };

  useEffect(() => {
    getProductListAdmin();
  }, []);

  const handleDetailView = () => {};

  const handleRefreshPressed = () => {};

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleSavePressed = () => {};

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý hóa đơn
      </h3>
      <Row style={{ marginBottom: '10px' }}>
        <Col sm={9} />
        <Col sm={3}>
          <ManageButtonsRow
            refreshButtonPressed={handleRefreshPressed}
            addButtonPressed={() => setModalShow(true)}
            addButtonVisible={true}
          />
        </Col>
      </Row>
      <ProductTable
        productList={productList}
        onEditPressed={handleDetailView}
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleSavePressed)}>
          <Modal.Body>
            <Col
              xs="auto"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: '10px',
                paddingLeft: '10px',
                width: '100%',
              }}
            >
              <Row style={{ width: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Tên sản phẩm"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="name"
                  defaultValue=""
                />
                {errors.name && (
                  <span className="errorText">Tên không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Hãng sản xuất"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="brand"
                  defaultValue=""
                />
                {errors.brand && (
                  <span className="errorText">Hãng sản xuất không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 200 }}
                  render={({ field: { value, onChange } }) => (
                    <DropdownList
                      data={productList}
                      dataKey="_id"
                      textField="name"
                      onChange={onChange}
                      value={value}
                      style={{ marginBottom: '20px' }}
                    />
                  )}
                  name="category"
                  defaultValue=""
                />
                {errors.category && (
                  <span className="errorText">Chưa chọn danh mục</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 50 }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Giá"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="price"
                  defaultValue=""
                />
                {errors.price && (
                  <span className="errorText">Giá không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 200 }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextInput
                      type="text"
                      placeholder="Giảm giá"
                      onChange={onChange}
                      eyeVisible={false}
                      passwordVisible={false}
                      toggleVisible={() => {}}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="discount"
                  defaultValue=""
                />
                {errors.discount && (
                  <span className="errorText">Giảm giá không hợp lệ</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 200 }}
                  render={({ field: { value, onChange } }) => (
                    <DropdownList
                      data={productList}
                      dataKey="_id"
                      textField="name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  name="id_role"
                  defaultValue=""
                />
                {errors.id_role && (
                  <span className="errorText">Chưa chọn trạng thái</span>
                )}

                <SmallMainButton
                  title="Chọn hình ảnh"
                  textColor={Color.white}
                  backgroundColor={Color['light-blue']}
                  onPressed={() => {}}
                />
              </Row>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <SmallMainButton
              title="Lưu"
              textColor={Color.white}
              backgroundColor={Color['light-blue']}
              onPressed={() => {}}
            />
            <SmallMainButton
              title="Hủy"
              textColor={Color.white}
              backgroundColor={Color.pink}
              onPressed={handleModalClose}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProduct;
