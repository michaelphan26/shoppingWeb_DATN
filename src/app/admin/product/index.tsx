import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import DropdownList from 'react-widgets/esm/DropdownList';
import { SmallMainButton } from '../../../common/ui/base/button';
import SmallTextArea from '../../../common/ui/base/textArea';
import { SmallTextInput } from '../../../common/ui/base/textInput';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  getProductListAdminFromAPI,
  getCategoryListFromAPI,
  editProductAPI,
  addProductAPI,
} from '../../../common/util/baseAPI';
import {
  initialProductItem,
  JustNameItemInterface,
  ProductItem,
} from '../../../common/util/common';
import { NotifyType, Color } from '../../../common/util/enum';
import ProductTable from './components/productTable';

const AdminProduct = () => {
  const [productList, setProductList] = useState([] as any);
  const statusList = [
    { name: 'Đang kinh doanh', _id: 'true' },
    { name: 'Ngừng kinh doanh', _id: 'false' },
  ] as [];
  const [modalShow, setModalShow] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });
  const [categoryList, setCategoryList] = useState([] as any);
  const [image, setImage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getProductListAdmin = async () => {
    const productListFromAPI = await getProductListAdminFromAPI();
    if (Object.keys(productListFromAPI).length !== 0) {
      setProductList(productListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách sản phẩm');
    }
  };

  const getCategoryListAdmin = async () => {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (Object.keys(categoryListFromAPI).length !== 0) {
      setCategoryList(categoryListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách danh mục');
    }
  };

  useEffect(() => {
    getProductListAdmin();
    getCategoryListAdmin();
  }, []);

  const resetValue = (item: ProductItem) => {
    const categoryItem = categoryList.find(
      (findItem: JustNameItemInterface) => {
        return findItem._id === item.id_category;
      }
    );
    reset({
      _id: item._id,
      name: item.name,
      brand: item.brand,
      id_category: { _id: categoryItem._id, name: categoryItem.name },
      price: item.price,
      description: item.description,
      image: item.image,
      stock: item.stock,
      discount: item.discount,
      status: item.status
        ? { name: 'Đang kinh doanh', _id: item.status }
        : { name: 'Ngừng kinh doanh', _id: item.status },
    });
    setImage(item.image);
    clearErrors();
    setIsEditing(true);
  };

  const handleAddPressed = () => {
    setModalShow(true);
    setIsEditing(false);
  };

  const handleDetailView = (item: ProductItem) => {
    resetValue(item);
    setModalShow(true);
  };

  const handleRefreshPressed = () => {
    getProductListAdmin();
    getCategoryListAdmin();
  };

  const handleModalClose = () => {
    const resetProduct = initialProductItem;
    resetProduct.status = '';
    reset(resetProduct);
    setImage('');
    clearErrors();
    setModalShow(false);
  };

  const handleSavePressed = async (item: ProductItem) => {
    item.id_category = item.id_category._id;
    item.status = item.status._id;
    if (isEditing) {
      item.image = image;
      const id = item._id;
      delete item._id;
      delete item.stock;
      const resultCode = await editProductAPI(item, id);
      if (resultCode === 200) {
        handleModalClose();
        toastNotify(
          NotifyType.success,
          'Cập nhật thông tin sản phẩm thành công'
        );
        handleRefreshPressed();
      } else {
        handleModalClose();
        toastNotify(NotifyType.error, 'Cập nhật thông tin sản phẩm thất bại');
      }
    } else {
      if (image === '') {
        toastNotify(NotifyType.warning, 'Chưa chọn hình ảnh');
      } else {
        item.image = image;
        delete item._id;
        delete item.stock;
        const resultCode = await addProductAPI(item);
        if (resultCode === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm sản phẩm thành công');
          handleRefreshPressed();
        } else {
          handleModalClose();
          toastNotify(NotifyType.error, 'Thêm sản phẩm thất bại');
        }
      }
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        const base64Result = e.target.result.split(',')[1];
        setImage(base64Result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý sản phẩm
      </h3>
      <Row style={{ marginBottom: '10px' }}>
        <Col sm={9} />
        <Col sm={3}>
          <ManageButtonsRow
            refreshButtonPressed={handleRefreshPressed}
            addButtonPressed={handleAddPressed}
            addButtonVisible={true}
          />
        </Col>
      </Row>
      <ProductTable
        productList={productList}
        onDetailPressed={handleDetailView}
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
                      disabled={isEditing}
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
                    minLength: 2,
                    maxLength: 100,
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
                      data={categoryList}
                      dataKey="_id"
                      textField="name"
                      onChange={onChange}
                      value={value}
                      style={{ marginBottom: '20px' }}
                    />
                  )}
                  name="id_category"
                  defaultValue=""
                />
                {errors.id_category && (
                  <span className="errorText">Chưa chọn danh mục</span>
                )}

                <Controller
                  control={control}
                  rules={{ required: true, min: 1000, max: 1000000000 }}
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
                  rules={{ required: true, min: 0, max: 100 }}
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
                      data={statusList}
                      dataKey="_id"
                      textField="name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  name="status"
                  defaultValue=""
                />
                {errors.status && (
                  <span className="errorText">Chưa chọn trạng thái</span>
                )}

                <div style={{ height: '20px' }} />
                <input
                  className="filetype"
                  type="file"
                  onChange={handleImageChange}
                  accept="/image*"
                />
                <div style={{ height: '20px' }} />
                {image === '' ? (
                  <div />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={'data:image/png;base64,' + image}
                      className="adminImgStyle"
                    />
                  </div>
                )}

                <div style={{ height: '20px' }} />

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                    maxLength: 200,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <SmallTextArea
                      placeholder="Mô tả"
                      onChange={onChange}
                      disabled={false}
                      value={value}
                    />
                  )}
                  name="description"
                  defaultValue=""
                />
                {errors.description && (
                  <span className="errorText">Mô tả sản phẩm không hợp lệ</span>
                )}
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
