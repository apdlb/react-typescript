import { Button, Layout, Menu } from 'antd';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/actions/AuthActions';

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Layout.Header className="grid-header">
              <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">{translate('nav.home')}</Menu.Item>
              </Menu>
              <div className="centred">
                <Button type="danger" shape="circle" icon="logout" onClick={onClickLogout} />
              </div>
            </Layout.Header>
          </>
        );
      }}
    </Translate>
  );
};

export default Header;
