import { Icon, Table } from 'antd';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

import { IPropsTable } from '../../../interfaces';

interface Props {
  propsTable: IPropsTable;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const { propsTable } = props;

  return (
    <Translate>
      {({ translate }) => {
        const columns = [
          {
            title: translate('entities.labels.field1'),
            dataIndex: 'field1',
            sorter: true
          },
          {
            title: translate('entities.labels.field2'),
            dataIndex: 'field2',
            sorter: true
          },
          {
            title: translate('entities.labels.field3'),
            dataIndex: 'field3',
            render: (field3: boolean) => <Icon type={field3 ? 'check' : 'cross'} />
          }
        ];

        return (
          <>
            <Table
              columns={columns}
              rowKey={(record: any) => record._id}
              dataSource={propsTable.data}
              pagination={propsTable.pagination}
              loading={propsTable.loading}
              onChange={propsTable.handleOnChange}
            />
          </>
        );
      }}
    </Translate>
  );
};

export default memo(EntitiesList);
