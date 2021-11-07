import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Color } from '../../../../util/enum';
import { SmallMainButton } from '../../../base/button';
import { HiRefresh } from 'react-icons/hi';

interface Props {
  addButtonPressed: () => void;
  refreshButtonPressed: () => void;
}
const ManageButtonsRow = (props: Props) => {
  return (
    <Row>
      <Col>
        <SmallMainButton
          backgroundColor={Color['light-blue']}
          onPressed={props.refreshButtonPressed}
          title=""
          textColor={Color.white}
        >
          <HiRefresh size={20} color={Color.white} />
        </SmallMainButton>
      </Col>
      <Col>
        <SmallMainButton
          backgroundColor={Color['light-blue']}
          onPressed={props.addButtonPressed}
          title="Thêm"
          textColor={Color.white}
        />
      </Col>
    </Row>
  );
};

export default ManageButtonsRow;
