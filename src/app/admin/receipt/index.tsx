import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Divider from '../../../common/ui/base/divider';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import ManageButtonsRow from '../../../common/ui/layout/admin-layout/components/manageButtonsRow';
import {
  getReceiptDetailAdminFromAPI,
  getReceiptListAdminFromAPI,
  getReceiptTypeListFromAPI,
  getUserInfoByIDFromAPI,
} from '../../../common/util/baseAPI';
import {
  initialJustNameItem,
  initialReceiptInterface,
  initialUserDetailInterface,
  JustNameItemInterface,
  ReceiptDetailInterface,
  ReceiptInterface,
  UserDetailInterface,
} from '../../../common/util/common';
import { NotifyType } from '../../../common/util/enum';
import ReceiptTable from './components/receiptTable';
import numeral from 'numeral';
import ReceiptDetailItemView from '../../receipt/receiptDetailItemView';

const AdminReceipt = () => {
  const [receiptList, setReceiptList] = useState([] as any);
  const [receipt, setReceipt] = useState<ReceiptInterface>(
    initialReceiptInterface
  );
  const [receiptType, setReceiptType] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [receiptDetailList, setReceiptDetailList] = useState([] as any);
  const [receiptTypeList, setReceiptTypeList] = useState([] as any);
  const [userDetail, setUserDetail] = useState<UserDetailInterface>(
    initialUserDetailInterface
  );
  const [modalShow, setModalShow] = useState<boolean>(false);

  const getReceiptListAdmin = async () => {
    const receiptListFromAPI = await getReceiptListAdminFromAPI();
    if (Object.keys(receiptListFromAPI).length !== 0) {
      setReceiptList(receiptListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách hóa đơn');
    }
  };

  const getReceiptTypeList = async () => {
    const receiptTypeListFromAPI = await getReceiptTypeListFromAPI();
    if (Object.keys(receiptTypeListFromAPI).length !== 0) {
      setReceiptTypeList(receiptTypeListFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy danh sách loại hóa đơn');
    }
  };

  useEffect(() => {
    getReceiptListAdmin();
    getReceiptTypeList();
  }, []);

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleRefreshPressed = () => {
    getReceiptListAdmin();
    getReceiptTypeList();
  };

  const getReceiptDetailList = async (_id: string) => {
    const receiptDetailListFromAPI = await getReceiptDetailAdminFromAPI(_id);
    if (Object.keys(receiptDetailListFromAPI).length !== 0) {
      setReceiptDetailList(receiptDetailListFromAPI);
    } else {
      setReceiptDetailList([]);
      toastNotify(
        NotifyType.error,
        'Không thể lấy chi tiết hóa đơn hoặc hóa đơn rỗng'
      );
    }
  };

  const getUserDetail = async (_id: string) => {
    const userDetailFromAPI = await getUserInfoByIDFromAPI(_id);
    if (Object.keys(userDetailFromAPI).length !== 0) {
      setUserDetail(userDetailFromAPI);
    } else {
      setUserDetail(initialUserDetailInterface);
      toastNotify(NotifyType.error, 'Không thể lấy thông tin khách hàng');
    }
  };

  const handleDetailView = async (
    receipt: ReceiptInterface,
    receiptType: JustNameItemInterface
  ) => {
    setReceipt(receipt);
    setReceiptType(receiptType);
    await getReceiptDetailList(receipt._id);
    await getUserDetail(receipt.id_user);
    setModalShow(true);
  };

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
            addButtonPressed={() => {}}
            addButtonVisible={false}
          />
        </Col>
      </Row>
      <ReceiptTable
        itemList={receiptList}
        receiptTypeList={receiptTypeList}
        onDetailPressed={handleDetailView}
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Mã hóa đơn: {receipt._id}</span>
          <br />
          <span>Ngày tháng: {receipt.date}</span>
          <br />
          <span>Loại hóa đơn: {receiptType.name}</span>
          <br />
          <span>Thành tiền: {numeral(receipt.total).format(0, 0)} đ</span>
          <Divider />
          <span>Họ tên: {userDetail.name}</span>
          <br />
          <span>SĐT: {userDetail.phone}</span>
          <br />
          <span>Địa chỉ: {userDetail.address}</span>
          <Divider />
          <Row>
            <Col sm={2}></Col>
            <Col
              sm={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Tên sản phẩm</span>
            </Col>
            <Col
              sm={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Thành tiền</span>
            </Col>
            <Col
              sm={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Giảm giá</span>
            </Col>
            <Col
              sm={1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>SL</span>
            </Col>
          </Row>
          {receiptDetailList ? (
            receiptDetailList.map((item: ReceiptDetailInterface) => {
              return <ReceiptDetailItemView receiptDetail={item} />;
            })
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default AdminReceipt;
