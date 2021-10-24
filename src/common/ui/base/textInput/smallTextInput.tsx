import React from 'react';
import './style.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  eyeVisible: boolean;
  passwordVisible: boolean;
  toggleVisible: () => void;
  disabled: boolean;
  value: string;
}
const SmallTextInput = (props: Props) => {
  return (
    <div className="smallTextInputContainer">
      <input
        className="smallTextInput"
        type={
          props.eyeVisible
            ? props.passwordVisible
              ? 'text'
              : 'password'
            : props.type
        }
        placeholder={props.placeholder}
        onChange={(event) => {
          event.preventDefault();
          props.onChange(event.target.value);
        }}
        value={props.value}
        disabled={props.disabled}
      />
      {props.eyeVisible ? (
        props.passwordVisible ? (
          <FaEyeSlash onClick={() => props.toggleVisible()} />
        ) : (
          <FaEye onClick={() => props.toggleVisible()} />
        )
      ) : (
        <> </>
      )}
    </div>
  );
};

export default SmallTextInput;
