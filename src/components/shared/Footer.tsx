import { Layout } from 'antd';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

interface Props {}

const Footer: React.FunctionComponent<Props> = () => {
  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Layout.Footer className="grid-footer">MERN Template with Typescript ©2019 Created by Apaez</Layout.Footer>
          </>
        );
      }}
    </Translate>
  );
};

export default memo(Footer);
