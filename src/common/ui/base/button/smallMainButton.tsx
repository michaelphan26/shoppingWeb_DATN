import React, { ReactNode } from 'react';
import './style.scss';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface Props {
  backgroundColor: string;
  textColor: string;
  title: string;
  onPressed: () => void;
  children: ReactNode;
}
const SmallMainButton = (props: Props) => {
  return (
    <button
      className="smallMainButton"
      style={{ backgroundColor: `${props.backgroundColor}` }}
      onClick={() => props.onPressed()}
      type="submit"
    >
      {props.children}
      <span style={{ color: `${props.textColor}` }}>{props.title}</span>
    </button>
  );
};

export default SmallMainButton;
