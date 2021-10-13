import React from 'react';
import './style.scss';

interface Props {
  title: string;
  checked: boolean;
  onChange: () => void;
}
const CheckBox = (props: Props) => {
  return (
    <span className="checkbox" onClick={() => props.onChange()}>
      <input type="checkbox" checked={props.checked} />
      <span></span>
      {props.title}
    </span>
  );
};

export default CheckBox;
