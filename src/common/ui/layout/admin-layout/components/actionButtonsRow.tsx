import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Color } from '../../../../util/enum';
import { SmallMainButton } from '../../../base/button';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
  editButtonVisible: boolean;
  editButtonPressed: () => void;
  deleteButtonVisible: boolean;
  deleteButtonPressed: () => void;
}
const ActionButtonsRow = (props: Props) => {
  return (
    <Row>
      {props.editButtonVisible ? (
        <Col>
          <SmallMainButton
            backgroundColor={Color['light-blue']}
            onPressed={props.editButtonPressed}
            title=""
            textColor={Color.white}
          >
            <FaEdit size={20} color={Color.white} />
          </SmallMainButton>
        </Col>
      ) : (
        <></>
      )}
      {props.deleteButtonVisible ? (
        <Col>
          <SmallMainButton
            backgroundColor={Color.pink}
            onPressed={props.deleteButtonPressed}
            textColor={Color.white}
            title=""
          >
            <FaTrash size={20} color={Color.white} />
          </SmallMainButton>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default ActionButtonsRow;
