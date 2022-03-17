import React from 'react';
import * as All from '@ant-design/icons';

export default function Icons(props) {
  const { name } = props;

  return React.createElement(All[name]);
}
