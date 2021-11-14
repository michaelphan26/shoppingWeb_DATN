import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import { Row, Col, Modal } from 'react-bootstrap';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import IOTable from './components/ioTable';
import {
  initialIOProduct,
  initialJustNameItem,
  initialProductItem,
  ioProductDetailItem,
  ioProductInterface,
  JustNameItemInterface,
  ProductItem,
  CompanyInterface,
  initialCompanyItem,
  initialIOProductDetailItem,
} from '../../../common/util/common';
import Divider from '../../../common/ui/base/divider';
import {
  addIOProductAPI,
  getCompanyListFromAPI,
  getIOProductDetailFromAPI,
  getIOProductListFromAPI,
  getIOTypeListFromAPI,
  getProductListAdminFromAPI,
} from '../../../common/util/baseAPI';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import { Color, NotifyType } from '../../../common/util/enum';
import IODetailItemView from './components/ioDetailItemView';
import DropdownList from 'react-widgets/esm/DropdownList';
import IODetailAddingItem from './components/ioDetailAddingItem';
import { MainButton, SmallMainButton } from '../../../common/ui/base/button';

const AdminIO = () => {
  const [ioList, setIOList] = useState([] as any);
  const [ioDetailList, setIODetailList] = useState([] as any);
  const [ioTypeList, setIOTypeList] = useState([] as any);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [addModalShow, setAddModalShow] = useState<boolean>(false);
  const [io, setIO] = useState<ioProductInterface>(initialIOProduct);
  const [ioType, setIOType] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [productList, setProductList] = useState([] as any);
  const [companyList, setCompanyList] = useState([] as any);

  const [ioTypeAdding, setIOTypeAdding] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [ioProductDetailAddingList, setIOProductDetailAddingList] = useState(
    [] as any
  );

  const getProductListAdmin = async () => {
    const productListFromAPI = await getProductListAdminFromAPI();
    if (Object.keys(productListFromAPI).length !== 0) {
      setProductList(productListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách sản phẩm');
    }
  };

  const getCompanyListAdmin = async () => {
    const companyListFromAPI = await getCompanyListFromAPI();
    if (Object.keys(companyListFromAPI).length !== 0) {
      setCompanyList(companyListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách đối tác');
    }
  };

  const getIOListFromAPI = async () => {
    const ioListFromAPI = await getIOProductListFromAPI();
    if (Object.keys(ioListFromAPI).length !== 0) {
      setIOList(ioListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách nhập xuất');
    }
  };

  const getIOTypeListAdmin = async () => {
    const ioTypeListFromAPI = await getIOTypeListFromAPI();
    if (Object.keys(ioTypeListFromAPI).length !== 0) {
      setIOTypeList(ioTypeListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách loại nhập xuất');
    }
  };

  const getIOProductDetail = async () => {
    const ioProductDetail = await getIOProductDetailFromAPI(io._id);
    if (Object.keys(ioProductDetail).length !== 0) {
      setIODetailList(ioProductDetail);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy chi tiết nhập xuất');
    }
  };

  useEffect(() => {
    getIOListFromAPI();
    getIOTypeListAdmin();
    getCompanyListAdmin();
    getProductListAdmin();
  }, []);

  const handleRefreshPressed = () => {
    getIOListFromAPI();
  };

  const handleModalClose = () => {
    setDetailModalShow(false);
    setAddModalShow(false);
    setIOTypeAdding(initialJustNameItem);
    setIOProductDetailAddingList([]);
  };

  const handleDetailView = (
    ioProduct: ioProductInterface,
    ioType: JustNameItemInterface
  ) => {
    setIO(ioProduct);
    setIOType(ioType);
    getIOProductDetail();
    setDetailModalShow(true);
  };

  const handleAddingModalShow = () => {
    setAddModalShow(true);
  };

  const handleAddDetailAddingIO = () => {
    setIOProductDetailAddingList([
      ...ioProductDetailAddingList,
      initialIOProductDetailItem,
    ]);
  };

  const handleValueChange = (index: number, value: string, type: string) => {
    switch (type) {
      case 'product': {
        setIOProductDetailAddingList(
          ioProductDetailAddingList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
              itemIndex !== index
                ? item
                : {
                    ...item,
                    id_product: value,
                  }
          )
        );
        break;
      }
      case 'company': {
        setIOProductDetailAddingList(
          ioProductDetailAddingList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
              itemIndex !== index
                ? item
                : {
                    ...item,
                    id_company: value,
                  }
          )
        );
        break;
      }
      case 'price': {
        setIOProductDetailAddingList(
          ioProductDetailAddingList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
              itemIndex !== index
                ? item
                : {
                    ...item,
                    price: value,
                  }
          )
        );
        break;
      }
      case 'quantity': {
        setIOProductDetailAddingList(
          ioProductDetailAddingList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
              itemIndex !== index
                ? item
                : {
                    ...item,
                    quantity: value,
                  }
          )
        );
        break;
      }
    }
  };

  const handleSaveIOPressed = async () => {
    if (ioTypeAdding._id === '') {
      toastNotify(NotifyType.error, 'Chưa chọn trạng thái');
    } else if (ioProductDetailAddingList.length !== 0) {
      console.log(ioProductDetailAddingList);
      let check = true;
      for (const index in ioProductDetailAddingList) {
        if (
          ioProductDetailAddingList[index].id_product === '' ||
          ioProductDetailAddingList[index].id_company === '' ||
          parseInt(ioProductDetailAddingList[index].price) < 1001 ||
          parseInt(ioProductDetailAddingList[index].quantity) < 1
        ) {
          check = false;
          break;
        } else {
          ioProductDetailAddingList[index].id_product =
            ioProductDetailAddingList[index].id_product._id;
          ioProductDetailAddingList[index].id_company =
            ioProductDetailAddingList[index].id_company._id;
        }
      }
      if (check) {
        const code = await addIOProductAPI(
          ioProductDetailAddingList,
          ioTypeAdding._id
        );
        //Toast
        if (code === 200) {
          handleModalClose();
          toastNotify(NotifyType.success, 'Thêm nhập xuất thành công');
          handleRefreshPressed();
        } else {
          toastNotify(NotifyType.error, 'Không thể thêm nhập xuất');
        }
      } else {
        toastNotify(NotifyType.error, 'Danh sách không hợp lệ');
      }
    } else {
      toastNotify(NotifyType.error, 'Danh sách sản phẩm không được để trống');
    }
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Quản lý nhập xuất
      </h3>
      <Row style={{ marginBottom: '10px' }}>
        <Col sm={9} />
        <Col sm={3}>
          <ManageButtonsRow
            refreshButtonPressed={handleRefreshPressed}
            addButtonPressed={handleAddingModalShow}
            addButtonVisible={true}
          />
        </Col>
      </Row>
      <IOTable
        itemList={ioList}
        ioTypeList={ioTypeList}
        onDetailPressed={handleDetailView}
      />
      <Modal
        show={detailModalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin nhập xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Mã nhập xuất: {io._id}</span>
          <br />
          <span>Ngày tháng: {io.date}</span>
          <br />
          <span>Loại phiếu nhập: {ioType.name}</span>
          <br />
          <Divider />
          <Row>
            <Col sm={2}></Col>
            <Col
              sm={10}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Thông tin sản phẩm</span>
            </Col>
          </Row>
          {ioDetailList ? (
            ioDetailList.map((item: ioProductDetailItem) => {
              return (
                <IODetailItemView
                  ioDetail={item}
                  productList={productList}
                  companyList={companyList}
                />
              );
            })
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={addModalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin nhập xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '75%',
              }}
            >
              <span>Loại phiếu nhập: </span>
              <br />
              <DropdownList
                data={ioTypeList}
                dataKey="_id"
                textField="name"
                onChange={(item) => setIOTypeAdding(item)}
                value={ioTypeAdding}
              />
            </div>
          </Col>
          <Divider />

          <Row>
            {ioProductDetailAddingList.map((item, index) => {
              return (
                <IODetailAddingItem
                  index={index}
                  productList={productList}
                  companyList={companyList}
                  item={item}
                  handleValueChange={handleValueChange}
                />
              );
            })}
          </Row>
          <Row>
            <Col sm={3}></Col>
            <Col
              sm={6}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SmallMainButton
                title="Thêm"
                textColor={Color.white}
                backgroundColor={Color['light-blue']}
                onPressed={handleAddDetailAddingIO}
              />
            </Col>
          </Row>
          {ioDetailList ? (
            ioDetailList.map((item: ioProductDetailItem) => {
              return (
                <IODetailItemView
                  ioDetail={item}
                  productList={productList}
                  companyList={companyList}
                />
              );
            })
          ) : (
            <></>
          )}
          <div style={{ height: '10px' }} />
        </Modal.Body>
        <Modal.Footer>
          <SmallMainButton
            backgroundColor={Color['light-blue']}
            onPressed={handleSaveIOPressed}
            title="Lưu"
            textColor={Color.white}
          />
          <SmallMainButton
            backgroundColor={Color.pink}
            onPressed={handleModalClose}
            title="Hủy"
            textColor={Color.white}
          />
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default AdminIO;
