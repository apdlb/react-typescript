import React, { memo } from 'react';

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  return (
    <>
      <div>Hola</div>
    </>
  );
};

export default memo(Home);
