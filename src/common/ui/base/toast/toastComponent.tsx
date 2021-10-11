import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { MdDone, MdError } from 'react-icons/md';
import { Color } from '../../../util/enum';
import {
  ErrorToastStyle,
  InfoToastStyle,
  SuccessToastStyle,
  WarningToastStyle,
  iconStyle,
} from './style';

export const SuccessToast = (msg: string) => {
  return (
    <div style={SuccessToastStyle}>
      <MdDone size={20} color={Color['light-blue']} style={iconStyle} />
      <span style={{ color: 'black' }}>{msg}</span>
    </div>
  );
};

export const ErrorToast = (msg: string) => {
  return (
    <div style={ErrorToastStyle}>
      <MdError size={20} color={Color.pink} style={iconStyle} />
      <span style={{ color: 'black' }}>{msg}</span>
    </div>
  );
};

export const WarningToast = (msg: string) => {
  return (
    <div style={WarningToastStyle}>
      <FaInfoCircle size={20} color={Color.pink} style={iconStyle} />
      <span style={{ color: 'black' }}>{msg}</span>
    </div>
  );
};

export const InfoToast = (msg: string) => {
  return (
    <div style={InfoToastStyle}>
      <FaInfoCircle size={20} color={Color.black} style={iconStyle} />
      <span style={{ color: 'black' }}>{msg}</span>
    </div>
  );
};
