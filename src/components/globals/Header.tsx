import { Layout, Menu } from 'antd';
import React from 'react';
import { Translate } from 'react-localize-redux';

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Layout.Header className="grid-header">
              <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">{translate('nav.home')}</Menu.Item>
              </Menu>
            </Layout.Header>
          </>
        );
      }}
    </Translate>
  );
};

export default Header;
