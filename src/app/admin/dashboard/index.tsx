import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import { getMainSummaryAPI } from '../../../common/util/baseAPI';
import { SummaryItemInterface } from '../../../common/util/common';
import { NotifyType, Url } from '../../../common/util/enum';
import { RootState } from '../../../models/store';
import SummaryItem from './summaryItem';
import './style.scss';

const AdminDashboard = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const [mainSummaryList, setMainSummaryList] = useState([] as any);

  const getMainSummaryFromAPI = async () => {
    const mainSummaryFromAPI = await getMainSummaryAPI();
    if (Object.keys(mainSummaryFromAPI).length !== 0) {
      setMainSummaryList(mainSummaryFromAPI);
    } else {
      toastNotify(NotifyType.error, 'Không thể lấy thống kê');
    }
  };

  useEffect(() => {
    if (
      (account.role_name.trim().toLowerCase() === 'admin') === false &&
      (account.role_name.trim().toLowerCase() === 'quản trị') === false
    ) {
      history.push(Url.Home);
      toastNotify(NotifyType.warning, 'Bạn không thể vào được trang này');
    } else {
      getMainSummaryFromAPI();
    }
  }, []);

  return (
    <AdminLayout>
      <Row>
        {mainSummaryList.map((item: SummaryItemInterface) => (
          <Col className="d-flex justify-content-center">
            <SummaryItem item={item} />
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;
