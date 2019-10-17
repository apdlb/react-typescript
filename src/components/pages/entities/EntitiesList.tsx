import { Table } from 'antd';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

interface Props {
  component: React.Component;
  propsTable: any;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const { propsTable } = props;
  const { data, pagination, loading, handleChange, getColumnSearchProps } = propsTable;

  return (
    <Translate>
      {({ translate }) => {
        const columns = [
          {
            title: 'Field 1',
            dataIndex: 'field1',
            sorter: true
          },
          {
            title: 'Field 2',
            dataIndex: 'field2',
            sorter: true,
            ...getColumnSearchProps('field2')
          },
          {
            title: 'Field 3',
            dataIndex: 'field3'
          }
        ];

        return (
          <>
            <fieldset>
              <legend>{translate('nav.entities')}</legend>
              <Table
                columns={columns}
                rowKey={(record: any) => record._id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleChange}
              />
            </fieldset>
          </>
        );
      }}
    </Translate>
  );
};

export default memo(EntitiesList);
