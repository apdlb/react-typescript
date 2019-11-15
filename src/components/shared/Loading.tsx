import { Spin } from 'antd';
import React, { memo } from 'react';

interface Props {}

const Loading: React.FunctionComponent<Props> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default memo(Loading);
