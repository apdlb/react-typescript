import { Layout } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import React, { ReactNode } from 'react';

interface Props {
  body: ReactNode | FormComponentProps;
}

const Content: React.FunctionComponent<Props> = ({ body }) => {
  return (
    <>
      <Layout.Content className="grid-content">{body}</Layout.Content>;
    </>
  );
};

export default Content;
