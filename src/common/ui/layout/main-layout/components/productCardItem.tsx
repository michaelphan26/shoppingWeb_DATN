import React from 'react';
import { Card } from 'react-bootstrap';
import { ProductItem } from '../../../../util/common';
import numeral from 'numeral';
import '../style.scss';
import { Link } from 'react-router-dom';

interface Props {
  productItem: ProductItem;
}
const ProductCardItem = (props: Props) => {
  return (
    <Link
      to={{
        pathname: `product/${props.productItem._id}`,
        state: { productItem: props.productItem },
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card className="productCard">
        <Card.Img
          src={'data:image/png;base64,' + props.productItem.image}
          className="imgStyle"
        />
        <Card.Body>
          <Card.Title as="div">
            <strong>{props.productItem.name}</strong>
          </Card.Title>
          <Card.Text as="h5">
            {numeral(props.productItem.price).format(0, 0)}đ
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCardItem;
