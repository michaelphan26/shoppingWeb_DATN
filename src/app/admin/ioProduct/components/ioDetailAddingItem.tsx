import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DropdownList from 'react-widgets/esm/DropdownList';
import { SmallTextInput } from '../../../../common/ui/base/textInput';
import { ioProductDetailItem } from '../../../../common/util/common';

interface Props {
  index: number;
  item: ioProductDetailItem;
  productList: [];
  companyList: [];
  handleValueChange: (index: number, value: string, type: string) => void;
}
const IODetailAddingItem = (props: Props) => {
  return (
    <Col
      sm={12}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: '10px',
        paddingLeft: '10px',
        width: '100%',
      }}
    >
      <Row style={{ width: '80%' }}>
        <span>Chọn sản phẩm: </span>
        <br />
        <DropdownList
          data={props.productList}
          dataKey="_id"
          textField="name"
          onChange={(item) =>
            props.handleValueChange(props.index, item, 'product')
          }
          value={props.item.id_product}
        />

        <div style={{ height: '10px' }} />
        <span>Chọn công ty: </span>
        <br />
        <DropdownList
          data={props.companyList}
          dataKey="_id"
          textField="name"
          onChange={(item) =>
            props.handleValueChange(props.index, item, 'company')
          }
          value={props.item.id_company}
        />
        <div style={{ height: '10px' }} />

        <span>Giá: </span>
        <br />
        <SmallTextInput
          type="number"
          placeholder="Giá"
          eyeVisible={false}
          passwordVisible={false}
          toggleVisible={() => {}}
          disabled={false}
          onChange={(value) =>
            props.handleValueChange(props.index, value, 'price')
          }
          value={props.item.price}
        />

        <span>Số lượng: </span>
        <br />
        <SmallTextInput
          type="number"
          placeholder="Số lượng"
          eyeVisible={false}
          passwordVisible={false}
          toggleVisible={() => {}}
          disabled={false}
          onChange={(value) =>
            props.handleValueChange(props.index, value, 'quantity')
          }
          value={props.item.quantity}
        />
      </Row>
    </Col>
  );
};

export default IODetailAddingItem;
