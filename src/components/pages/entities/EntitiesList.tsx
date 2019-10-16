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
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: (name: any) => `${name.first} ${name.last}`,
            width: '20%'
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            sorter: true,
            filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
            width: '20%'
          },
          {
            title: 'Email',
            dataIndex: 'email'
          }
        ];

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
