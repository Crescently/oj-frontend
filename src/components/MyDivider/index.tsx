import React from 'react';

interface Props {
  height: number;
}

const MyDivider: React.FC<Props> = (props) => {
  return <div style={{ marginBottom: props.height }}></div>;
};
export default MyDivider;
