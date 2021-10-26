import React, { useEffect, useState } from 'react';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';
import { RouteComponentProps, StaticContext } from 'react-router';
import { Link } from 'react-router-dom';
import MainLayout from '../../common/ui/layout/main-layout';
import { ProductItem } from '../../common/util/common';
import './style.scss';
import numeral from 'numeral';
import { MainButton, RoundedQuantityButton } from '../../common/ui/base/button';
import { Color, NotifyType } from '../../common/util/enum';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../models/cartReducers';
import { addReceiptAPI } from '../../common/util/baseAPI';

type ProductState = {
  productItem: ProductItem;
};
interface Props extends RouteComponentProps<{}, StaticContext, ProductState> {}
const Product = (props: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartReducers);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityInputChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  async function pushToAPI() {
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
  }

  useEffect(() => {
    pushToAPI();
  }, [cart]);

  const handleAddToCart = () => {
    if (quantity < 1) {
      toastNotify(NotifyType.warning, 'Bạn chưa chọn hoặc nhập số lượng');
    } else {
      dispatch(
        addToCart({
          cartItem: {
            id_product: props.location.state.productItem._id,
            image: props.location.state.productItem.image,
            name: props.location.state.productItem.name,
            stock: props.location.state.productItem.stock,
            price: props.location.state.productItem.price,
            discount: props.location.state.productItem.discount,
            quantity: quantity,
          },
        })
      );
      toastNotify(NotifyType.success, 'Thêm vào giỏ hàng thành công');
    }
  };

  return (
    <MainLayout>
      <Row>
        <Col>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <span>Home</span>
          </Link>
          <span> / {props.location.state.productItem.name}</span>
        </Col>
        <Row className="py-3">
          <Col xs="4">
            <img
              src={
                'data:image/png;base64,' +
                props.location.state.productItem.image
              }
              className="productImgStyle"
              alt="product_image"
              width="350"
              height="300"
            />
          </Col>
          <Col xs="1"></Col>
          <Col xs="5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{props.location.state.productItem.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <span>Đã bán:</span>
                  <span>
                    Số lượng còn lại: {props.location.state.productItem.stock}
                  </span>
                  <span>
                    Giảm giá: {props.location.state.productItem.discount}%
                  </span>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {props.location.state.productItem.discount === 0 ? (
                  <h3 style={{ marginTop: 10, marginBottom: 10 }}>
                    Giá:{' '}
                    {numeral(props.location.state.productItem.price).format(
                      0,
                      0
                    )}
                    đ
                  </h3>
                ) : (
                  <Row>
                    <h3
                      style={{ marginTop: 10, textDecoration: 'line-through' }}
                    >
                      Giá cũ:{' '}
                      {numeral(props.location.state.productItem.price).format(
                        0,
                        0
                      )}
                      đ
                    </h3>
                    <h3 style={{ marginBottom: 10, color: 'red' }}>
                      Giá khuyến mãi:{' '}
                      {numeral(
                        (
                          (props.location.state.productItem.price *
                            props.location.state.productItem.discount) /
                          100
                        ).toString()
                      ).format(0, 0)}
                      đ
                    </h3>
                  </Row>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row xs="auto" style={{ marginBottom: 10 }}>
                  <Col>
                    <RoundedQuantityButton
                      type="minus"
                      onPressed={decreaseQuantity}
                    />
                  </Col>
                  <div>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityInputChange}
                      style={{
                        border: 'none',
                        textAlign: 'center',
                        minWidth: '20px',
                        maxWidth: '50px',
                      }}
                    />
                  </div>

                  <Col>
                    <RoundedQuantityButton
                      type="plus"
                      onPressed={increaseQuantity}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <MainButton
              backgroundColor={Color['light-blue']}
              textColor={Color.white}
              title="Thêm vào giỏ hàng"
              onPressed={handleAddToCart}
            >
              <FaShoppingCart
                size={18}
                color="white"
                style={{ marginRight: 5 }}
              />
            </MainButton>
          </Col>
        </Row>
      </Row>
      <Container className="descriptionCard">
        <h3>Mô tả sản phẩm </h3>
        <div className="breakLine">
          {props.location.state.productItem.description.replace(/\\n/g, '\n')}
        </div>
      </Container>
    </MainLayout>
  );
};

export default Product;
