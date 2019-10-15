import { Table } from 'antd';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

interface Props {
  entities?: any;
  loadingTable: boolean;
  handleTableChange: any;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const {
    entities: { data, pagination },
    loadingTable,
    handleTableChange
  } = props;

  return (
    <Translate>
      {({ translate }) => {
        const columns = [{}];

        return (
          <>
            <Table
              columns={columns}
              rowKey={(record: any) => record.login.uuid}
              dataSource={data}
              pagination={pagination}
              loading={loadingTable}
              onChange={handleTableChange}
            />
          </>
        );
      }}
    </Translate>
  );
};

export default memo(EntitiesList);
