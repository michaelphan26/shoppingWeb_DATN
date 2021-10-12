import React from 'react';
import './style.scss';
import { FaShoppingCart } from 'react-icons/fa';

interface Props {
  backgroundColor: string;
  textColor: string;
  title: string;
  onPressed: () => void;
}
const MainButton = (props: Props) => {
  return (
    <button
      className="mainButtonContainer"
      style={{ backgroundColor: `${props.backgroundColor}` }}
      onClick={() => props.onPressed()}
    >
      <FaShoppingCart
        size={18}
        color={`${props.textColor}`}
        style={{ marginRight: 5 }}
      />
      <span style={{ color: `${props.textColor}` }}>{props.title}</span>
    </button>
  );
};

export default MainButton;
