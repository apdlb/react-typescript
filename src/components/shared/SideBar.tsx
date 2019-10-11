import React from 'react';
import { Translate } from 'react-localize-redux';

interface Props {}

const SideBar: React.FunctionComponent<Props> = () => {
  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <aside className="grid-sidebar">
              <h3>SIDEBAR</h3>
            </aside>
          </>
        );
      }}
    </Translate>
  );
};

export default SideBar;
