import React from 'react';
import { Card } from 'react-bootstrap';
import { SummaryItemInterface } from '../../../common/util/common';

interface Props {
  item: SummaryItemInterface;
}
const SummaryItem = (props: Props) => {
  return (
    <Card
      className="summaryCard"
      style={{ backgroundColor: `${props.item.color}` }}
    >
      <Card.Body>
        <Card.Title as="div">
          <strong>{props.item.title}</strong>
        </Card.Title>
        <Card.Text as="h5">{props.item.count}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SummaryItem;
