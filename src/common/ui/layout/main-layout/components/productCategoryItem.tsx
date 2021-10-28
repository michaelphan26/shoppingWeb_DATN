import React from 'react';
import { Card } from 'react-bootstrap';
import { ProductItem } from '../../../../util/common';
import numeral from 'numeral';
import '../style.scss';
import { Link } from 'react-router-dom';

interface Props {
  productItem: ProductItem;
}
const ProductCategoryItem = (props: Props) => {
  return (
    <Link
      to={{
        pathname: `product/${props.productItem._id}`,
        state: { productItem: props.productItem },
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card className="categoryCard">
        <Card.Img
          src={'data:image/png;base64,' + props.productItem.image}
          className="imgStyle"
          style={{ width: '45%', height: '45%' }}
        />
        <Card.Body>
          <Card.Title as="div">
            <span>{props.productItem.name}</span>
          </Card.Title>
          <Card.Text as="h6">
            {numeral(props.productItem.price).format(0, 0)}đ
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCategoryItem;
