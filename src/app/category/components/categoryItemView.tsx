import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FiChevronRight } from 'react-icons/fi';
import { JustNameItemInterface } from '../../../common/util/common';
import { Link } from 'react-router-dom';

interface Props {
  item: JustNameItemInterface;
}
const CategoryItemView = (props: Props) => {
  return (
    <Link
      to={{
        pathname: `category`,
        search: `id=${props.item._id}`,
      }}
      style={{ textDecoration: 'none' }}
    >
      <Row style={{ marginBottom: '5px' }}>
        <Col sm={6}>
          <span className="spanOverflowLeft">{props.item.name}</span>
        </Col>
        <Col
          sm={6}
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <FiChevronRight size={20} color="black" />
        </Col>
      </Row>
    </Link>
  );
};

export default CategoryItemView;
