import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Color } from '../../../../util/enum';
import { SmallMainButton } from '../../../base/button';

interface Props {
  startDate: number;
  onStartDateChange: (startDate: number) => void;
  endDate: number;
  onEndDateChange: (endDate: number) => void;
  onStatisticPressed: () => void;
  onResetPressed: () => void;
}
const DatePickerRow = (props: Props) => {
  return (
    <Row>
      <Row>
        <Col sm={3} />
        <Col sm={3}>
          <span>Ngày bắt đầu: </span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.startDate}
            onChange={props.onStartDateChange}
          />
        </Col>
        <Col sm={3}>
          <span>Ngày kết thúc: </span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.endDate}
            onChange={props.onEndDateChange}
          />
        </Col>
      </Row>
      <div style={{ height: '20px' }} />
      <Row>
        <Col sm={3} />
        <Col sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <SmallMainButton
            backgroundColor={Color['light-blue']}
            onPressed={props.onStatisticPressed}
            title="Thống kê"
            textColor={Color.white}
          />
        </Col>
        <Col sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <SmallMainButton
            backgroundColor={Color.pink}
            onPressed={props.onResetPressed}
            title="Nhập lại"
            textColor={Color.white}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default DatePickerRow;
