import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Divider from '../../common/ui/base/divider';
import { toastNotify } from '../../common/ui/base/toast/notify';
import MainLayout from '../../common/ui/layout/main-layout';
import ReceiptItemView from '../../common/ui/layout/main-layout/components/receiptItemView';
import {
  getReceiptListFromAPI,
  getReceiptTypeListFromAPI,
} from '../../common/util/baseAPI';
import {
  initialReceiptInterface,
  JustNameItemInterface,
  ReceiptInterface,
  initialJustNameItem,
} from '../../common/util/common';
import { NotifyType, Url } from '../../common/util/enum';
import { RootState } from '../../models/store';
import './style.scss';
import numeral from 'numeral';

const Receipt = () => {
  const [receiptList, setReceiptList] = useState([] as any);
  const [receiptTypeList, setReceiptTypeList] = useState([] as any);
  const [receipt, setReceipt] = useState<ReceiptInterface>(
    initialReceiptInterface
  );
  const [receiptType, setReceiptType] =
    useState<JustNameItemInterface>(initialJustNameItem);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const account = useSelector((state: RootState) => state.accountReducer);
  const accountDetail = useSelector(
    (state: RootState) => state.accountDetailReducer
  );
  const history = useHistory();

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListFromAPI();
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

  const tokenCheck = async () => {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      history.push(Url.Home);
      toastNotify(NotifyType.error, 'Bạn chưa đăng nhập');
    } else {
      await getReceiptList();
      await getReceiptTypeList();
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleModalOpen = (
    receipt: ReceiptInterface,
    receiptType: JustNameItemInterface
  ) => {
    setReceipt(receipt);
    setReceiptType(receiptType);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <MainLayout>
      <Row>
        <Col sm={8} className="roundedContainer">
          <h3 style={{ marginBottom: '30px' }}>Danh sách hóa đơn</h3>
          <Row style={{ marginBottom: '20px' }}>
            <Col sm={3}>
              <span className="spanOverflow">Mã hóa đơn</span>
            </Col>
            <Col sm={3}>
              <span className="spanOverflow">Ngày tháng</span>
            </Col>
            <Col sm={2}>
              <span className="spanOverflow">Loại hóa đơn</span>
            </Col>
            <Col sm={2} style={{ textAlign: 'center' }}>
              <span className="spanOverflow">Thành tiền</span>
            </Col>
          </Row>
          <Divider />
          <Row style={{ height: '5px' }} />
          {receiptList.map((item: ReceiptInterface) => {
            return (
              <div>
                <ReceiptItemView
                  receipt={item}
                  receiptTypeList={receiptTypeList}
                  onDetailPressed={handleModalOpen}
                />
                <Divider />
              </div>
            );
          })}
        </Col>
        <Col sm={1} />
        <Col sm={3} className="roundedContainer">
          <h3 style={{ marginBottom: '30px' }}>Thống kê</h3>
          <Row>
            <Row>
              <Col>
                <span>Số hóa đơn: </span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <span>{receiptList.length}</span>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col>
                <span>Tổng tiền: </span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <span>
                  {numeral(
                    receiptList.reduce(
                      (sum, item: ReceiptInterface) => sum + item.total,
                      0
                    )
                  ).format(0, 0)}{' '}
                  đ
                </span>
              </Col>
            </Row>

            <Divider />
          </Row>
        </Col>
      </Row>
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
          <span>Họ tên: {accountDetail.name}</span>
          <br />
          <span>SĐT: {accountDetail.phone}</span>
          <br />
          <span>Email: {account.email}</span>
          <br />
          <span>Địa chỉ: {accountDetail.address}</span>
          <Divider />
        </Modal.Body>
      </Modal>
    </MainLayout>
  );
};

export default Receipt;
