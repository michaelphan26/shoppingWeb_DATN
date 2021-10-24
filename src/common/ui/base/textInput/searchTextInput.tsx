import React from 'react';
import './style.scss';
import { FaSearch } from 'react-icons/fa';

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  toggleSearch: () => void;
}
const SearchTextInput = (props: Props) => {
  return (
    <div className="smallTextInputContainer">
      <input
        className="smallTextInput"
        type="text"
        placeholder={props.placeholder}
        onChange={(event) => {
          event.preventDefault();
          props.onChange(event.target.value);
        }}
      />
      <FaSearch
        onClick={() => props.toggleSearch()}
        size={14}
        style={{ marginLeft: 6 }}
      />
    </div>
  );
};

export default SearchTextInput;
