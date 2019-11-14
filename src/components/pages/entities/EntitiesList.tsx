import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Icon, Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import { gql } from 'apollo-boost';
import _ from 'lodash';
import React, { memo, useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { ENTITIES_PAGINATED, GET_ENTITIES_PAGINATED, SET_ENTITIES_PAGINATED } from '../../../graphql/entities';
import { IPropsTable } from '../../../interfaces';
import PATHS from '../../../utils/paths';

interface Props {
  propsTable: IPropsTable;
  onClickDelete: Function;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const { propsTable, onClickDelete } = props;
  const client = useApolloClient();

  // const {
  //   data: {
  //     getPaginateEntitiesParams: { __typename, ...restParams } = {} as any
  //   } = {} as any
  // } = useQuery(GET_PAGINATE_ENTITIES_PARAMS);
  // console.log("Prueba", restParams);
  const {
    loading: l1,
    data: { getEntitiesPaginated = {} as any } = {} as any
  } = useQuery(GET_ENTITIES_PAGINATED, {
    variables: { filter: { page: 1, pageSize: 2 } }
  });

  const { loading: l2, data: q2 } = useQuery(ENTITIES_PAGINATED);

  console.log(l1, getEntitiesPaginated);
  console.log("Entre medio");
  console.log(l2, q2);

  const [setEntitiesPaginated] = useMutation(SET_ENTITIES_PAGINATED, {
    update: cache => {
      const data = cache.readQuery({
        query: ENTITIES_PAGINATED
      }) as any;
      console.log("mutation", data);
      const dataClone = {
        ...data,
        entitiesPaginated: {
          ...data.entitiesPaginated,
          ...getEntitiesPaginated
        }
      };

      cache.writeQuery({
        query: ENTITIES_PAGINATED,
        data: dataClone
      });
    }
  });

  useEffect(() => {
    if (!_.isEmpty(getEntitiesPaginated)) {
      setEntitiesPaginated({
        variables: { entitiesPaginated: getEntitiesPaginated }
      });
    }
  }, [getEntitiesPaginated, setEntitiesPaginated]);

  // TEST
  const data = {} as any;
  const restParams = {} as any;
  const __typename = "";
  //
  const {
    getEntitiesPaginated: { docs, page, limit, totalDocs } = {} as any
  } = data;

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

    client.writeData({
      data: { paginateEntitiesParams: { ...newParams, __typename } }
    });
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
            <Button
              className="float"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => setEntitiesPaginated()}
            />
            {/* <Link to={PATHS.ENTITIES_NEW}>
              <Button
                className="float"
                type="primary"
                shape="circle"
                icon="plus"
              />
            </Link> */}
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
