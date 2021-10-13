import React, { ReactNode } from 'react';
import './style.scss';

interface Props {
  backgroundColor: string;
  textColor: string;
  title: string;
  onPressed: () => void;
  children: ReactNode;
}
const MainButton = (props: Props) => {
  return (
    <button
      className="mainButtonContainer"
      style={{ backgroundColor: `${props.backgroundColor}` }}
      onClick={() => props.onPressed()}
      type="submit"
    >
      {props.children}
      <span style={{ color: `${props.textColor}` }}>{props.title}</span>
    </button>
  );
};

export default MainButton;
