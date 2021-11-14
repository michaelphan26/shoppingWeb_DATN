import React from 'react';
import '../textInput/style.scss';

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
  value: string;
}
const SmallTextArea = (props: Props) => {
  return (
    <div className="smallTextInputContainer">
      <textarea
        className="smallTextInput"
        placeholder={props.placeholder}
        onChange={(event) => {
          event.preventDefault();
          props.onChange(event.target.value);
        }}
        value={props.value}
        disabled={props.disabled}
        rows={5}
      />
    </div>
  );
};

export default SmallTextArea;
