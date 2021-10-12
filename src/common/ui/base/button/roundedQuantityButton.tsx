import React from 'react';
import './style.scss';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface Props {
  type: string;
  onPressed: () => void;
}
const RoundedQuantityButton = (props: Props) => {
  return (
    <button
      className="quantityButtonContainer"
      onClick={() => props.onPressed()}
    >
      {props.type === 'plus' ? <FaPlus size={14} /> : <FaMinus size={14} />}
    </button>
  );
};

export default RoundedQuantityButton;
