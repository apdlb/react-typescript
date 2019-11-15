import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Icon, Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import _ from 'lodash';
import React, { memo, useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import {
  ENTITIES_PAGINATED,
  GET_ENTITIES_PAGINATED,
  PAGINATE_ENTITIES_PARAMS,
  SET_ENTITIES_PAGINATED,
  SET_PAGINATE_ENTITIES_PARAMS
} from '../../../graphql/entities';
import { IPropsTable } from '../../../interfaces';
import PATHS from '../../../utils/paths';
import Loading from '../../shared/Loading';

interface Props {
  propsTable: IPropsTable;
  onClickDelete: Function;
}

const EntitiesList: React.FunctionComponent<Props> = props => {
  const { propsTable, onClickDelete } = props;

  const [setEntitiesPaginated] = useMutation(SET_ENTITIES_PAGINATED, {
    update: (cache, res) => {
      const data = cache.readQuery({
        query: ENTITIES_PAGINATED
      }) as any;

      const dataClone = {
        ...data,
        entitiesPaginated: {
          ...res?.data?.setEntitiesPaginated
        }
      };

      cache.writeQuery({
        query: ENTITIES_PAGINATED,
        data: dataClone
      });
    }
  });

  const [getEntitiesPaginated, { loading }] = useLazyQuery(
    GET_ENTITIES_PAGINATED,
    {
      onCompleted: data => {
        setEntitiesPaginated({
          variables: {
            entitiesPaginated: data?.getEntitiesPaginated
          }
        });
      }
    }
  );

  const [setPaginateEntitiesParams] = useMutation(
    SET_PAGINATE_ENTITIES_PARAMS,
    {
      update: (cache, res) => {
        const data = cache.readQuery({
          query: PAGINATE_ENTITIES_PARAMS
        }) as any;

        const dataClone = {
          ...data,
          paginateEntitiesParams: {
            ...res?.data?.setPaginateEntitiesParams
          }
        };

        cache.writeQuery({
          query: PAGINATE_ENTITIES_PARAMS,
          data: dataClone
        });
      }
    }
  );

  // Get list of entities from cache
  const { data: dataEntitiesPaginatedCached } = useQuery(ENTITIES_PAGINATED);
  // Get params of pagination from cache
  const { data: dataPaginateEntitiesParamsCached } = useQuery(
    PAGINATE_ENTITIES_PARAMS
  );

  const {
    entitiesPaginated: { docs, page, limit, totalDocs } = {} as any
  } = dataEntitiesPaginatedCached;
  const {
    paginateEntitiesParams = {} as any
  } = dataPaginateEntitiesParamsCached;

  useEffect(() => {
    const { __typename, ...restParams } = paginateEntitiesParams;
    getEntitiesPaginated({ variables: { filter: restParams } });
  }, [paginateEntitiesParams, getEntitiesPaginated]);

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
    const { __typename, ...restParams } = paginateEntitiesParams;

    const params = Object.assign({}, restParams);
    params.page = pagination.current;
    params.pageSize = pagination.pageSize;

    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }

    getEntitiesPaginated({ variables: { filter: params } });
    setPaginateEntitiesParams({
      variables: { params }
    });
  };

  if (loading) return <Loading />;

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
