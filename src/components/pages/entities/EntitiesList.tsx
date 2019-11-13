import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { Button, Icon, Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { GET_ENTITIES_PAGINATED } from '../../../graphql/entities';
import { IPropsTable } from '../../../interfaces';
import PATHS from '../../../utils/paths';

interface Props {
  propsTable: IPropsTable;
  onClickDelete: Function;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const { propsTable, onClickDelete } = props;
  const client = useApolloClient();

  const [
    getEntitiesPaginated,
    { data: dataLazyQuery = {} as any }
  ] = useLazyQuery(GET_ENTITIES_PAGINATED);

  const {
    getEntitiesPaginated: { docs, page, limit, totalDocs } = {} as any,
    paginateEntitiesParams: { __typename, ...restParams } = {} as any
  } = dataLazyQuery;

  const [params, setParams] = useState({ page: 1, pageSize: 5 } as any);

  useEffect(() => {
    getEntitiesPaginated({ variables: { filter: params } });
  }, [params, getEntitiesPaginated]);

  const pagination = {
    current: page,
    pageSize: limit,
    total: totalDocs
  };

  const onTableChange = (
    pagination: PaginationConfig,
    filters: any,
    sorter: any
  ) => {
    const newParams = Object.assign({}, restParams);
    newParams.page = pagination.current;
    newParams.pageSize = pagination.pageSize;

    if (!_.isEmpty(sorter)) {
      newParams.sort = sorter.field;
      newParams.order = sorter.order;
    }

    getEntitiesPaginated({ variables: { filter: newParams } });
    client.writeData({
      data: { paginateEntitiesParams: { ...newParams, __typename } }
    });
    setParams(newParams);
  };

  return (
    <Translate>
      {({ translate }) => {
        const columns = [
          {
            title: translate("entities.labels.field1"),
            dataIndex: "field1",
            sorter: true
          },
          {
            title: translate("entities.labels.field2"),
            dataIndex: "field2",
            sorter: true
          },
          {
            title: translate("entities.labels.field3"),
            dataIndex: "field3",
            render: (field3: boolean) => (
              <Icon type={field3 ? "check" : "close"} />
            )
          },
          {
            title: translate("generic.labels.actions"),
            render: (record: any) => renderActions({ record, onClickDelete }),
            width: "10%",
            align: "center" as const
          }
        ];

        return (
          <>
            <Table
              columns={columns}
              rowKey={(record: any) => record._id}
              dataSource={docs}
              pagination={pagination}
              loading={propsTable.loading}
              onChange={onTableChange}
            />
            <Link to={PATHS.ENTITIES_NEW}>
              <Button
                className="float"
                type="primary"
                shape="circle"
                icon="plus"
              />
            </Link>
          </>
        );
      }}
    </Translate>
  );
};

const renderActions = ({ record, onClickDelete }: any) => {
  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Link to={_.replace(PATHS.ENTITIES_ID, ":id", record._id)}>
              <Icon
                type="edit"
                title={translate("generic.labels.edit") as string}
              />
            </Link>
            <Button
              type="link"
              icon="delete"
              onClick={() => onClickDelete(record._id)}
              title={translate("generic.labels.delete") as string}
            />
          </>
        );
      }}
    </Translate>
  );
};

export default memo(EntitiesList);
