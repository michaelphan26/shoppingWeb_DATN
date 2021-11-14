import axios from 'axios';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toastNotify } from '../../../common/ui/base/toast/notify';
import AdminLayout from '../../../common/ui/layout/admin-layout';
import DatePickerRow from '../../../common/ui/layout/main-layout/components/datePickerRow';
import { api_url } from '../../../common/util/baseAPI';
import { NotifyType } from '../../../common/util/enum';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import numeral from 'numeral';

const AdminStatistic = () => {
  const [startDate, setStartDate] = useState<number>(Date.now());
  const [endDate, setEndDate] = useState<number>(Date.now());
  const [chartDataList, setChartDataList] = useState([] as any);

  const handleResetPressed = () => {
    setStartDate(Date.now());
    setEndDate(Date.now());
    setChartDataList([]);
  };

  function dateValidate() {
    const today = Date.now();
    console.log(startDate);
    console.log(endDate);
    console.log(today);
    if (startDate > endDate) {
      return false;
    } else if (startDate > today || endDate > today) {
      return false;
    }
    return true;
  }

  const processDataToChart = (data: any[]) => {
    let labelList = [] as any;
    let sumList = [] as any;
    for (const index in data) {
      const indexOfLabel = labelList.findIndex(
        (date: string) =>
          new Date(data[index].date).toLocaleDateString() === date
      );

      if (indexOfLabel === -1) {
        labelList.push(new Date(data[index].date).toLocaleDateString());
        sumList.push(parseInt(data[index].total));
      } else {
        sumList[indexOfLabel] =
          parseInt(sumList[indexOfLabel]) + parseInt(data[index].total);
      }
    }

    const tempData = [] as any;
    for (const index in labelList) {
      tempData.push({
        date: labelList[index],
        total: sumList[index],
      });
    }
    setChartDataList(tempData);
  };

  const handleStatisticPressed = async () => {
    if (dateValidate()) {
      const token = await window.sessionStorage.getItem('token');
      console.log(token);
      if (token) {
        await axios({
          url: 'admin/get-receipt-statistic',
          baseURL: `${api_url}`,
          method: 'post',
          headers: {
            'x-auth-token': token,
          },
          data: {
            dateFrom: new Date(startDate).toLocaleDateString('en-CA'),
            dateTo: new Date(endDate).toLocaleDateString('en-CA'),
          },
          responseType: 'json',
        })
          .then((res) => {
            if (res.data['code'] === 200) {
              processDataToChart(res.data['data']);
            } else {
              toastNotify(NotifyType.error, 'Không thể lấy thông tin hóa đơn');
            }
          })
          .catch((err) =>
            toastNotify(NotifyType.error, 'Không thể lấy thông tin hóa đơn')
          );
      }
    } else {
      toastNotify(NotifyType.error, 'Vui lòng kiểm tra lại ngày tháng');
    }
  };

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${numeral(payload[0].value).format(
            0,
            0
          )}đ`}</p>
        </div>
      );
    }

    return null;
  };

  const yAxisFormatter = (number) => {
    return `${numeral(number).format(0, 0)}đ`;
  };

  const chartReturn = () => {
    return (
      <LineChart
        width={700}
        height={300}
        data={chartDataList}
        margin={{ top: 0, left: 100, right: 100, bottom: 0 }}
      >
        <Line type="monotone" dataKey="total" strokeWidth={2} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={yAxisFormatter} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    );
  };

  return (
    <AdminLayout>
      <h3
        style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
      >
        Thống kê doanh thu
      </h3>
      <Row
        style={{
          marginBottom: '20px',
        }}
      >
        <Col
          sm={12}
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <DatePickerRow
            startDate={startDate}
            onStartDateChange={(startDateSelected) => {
              const tempDate = new Date(startDateSelected);
              setStartDate(Date.parse(tempDate.toLocaleString()));
            }}
            endDate={endDate}
            onEndDateChange={(endDateSelected) => {
              const tempDate = new Date(endDateSelected);
              setEndDate(Date.parse(tempDate.toLocaleString()));
            }}
            onStatisticPressed={handleStatisticPressed}
            onResetPressed={handleResetPressed}
          />
        </Col>
      </Row>
      <Col
        sm={12}
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {chartDataList.length !== 0 ? (
          chartReturn()
        ) : (
          <div>
            <h3>Chưa có dữ liệu</h3>
          </div>
        )}
      </Col>
    </AdminLayout>
  );
};

export default AdminStatistic;
