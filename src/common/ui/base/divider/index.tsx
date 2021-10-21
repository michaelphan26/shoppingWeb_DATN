import React from 'react';
import { Color } from '../../../util/enum';

const Divider = () => {
  return (
    <div
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        height: '2px',
        marginLeft: '5px',
        marginRight: '5px',
        width: '98%',
        borderTop: `1px solid ${Color['light-gray']}`,
      }}
    />
  );
};

export default Divider;
