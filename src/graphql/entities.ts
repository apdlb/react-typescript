import gql from 'graphql-tag';

export const initialEntities = {
  entitiesPaginated: {
    __typename: "EntitiesPaginated",
    docs: [],
    page: null,
    limit: null,
    totalDocs: null
  } as any,
  paginateEntitiesParams: {
    __typename: "PaginateEntitiesParams",
    page: 1,
    pageSize: 2,
    sort: "_id",
    order: "asc",
    field1: null,
    field2: null
  } as any
};

export const GET_ENTITIES_PAGINATED = gql`
  query GetEntitiesPaginated($filter: JSON!) {
    getEntitiesPaginated(filter: $filter)
  }
`;

export const ENTITIES_PAGINATED = gql`
  query entitiesPaginated {
    entitiesPaginated @client {
      docs
      page
      limit
      totalDocs
    }
  }
`;

export const SET_ENTITIES_PAGINATED = gql`
  mutation setEntitiesPaginated($entitiesPaginated: JSON!) {
    setEntitiesPaginated(entitiesPaginated: $entitiesPaginated) @client
  }
`;

export const PAGINATE_ENTITIES_PARAMS = gql`
  query paginateEntitiesParams {
    paginateEntitiesParams @client {
      page
      pageSize
      sort
      order
      field1
      field2
    }
  }
`;

export const SET_PAGINATE_ENTITIES_PARAMS = gql`
  mutation setPaginateEntitiesParams($params: JSON!) {
    setPaginateEntitiesParams(params: $params) @client
  }
`;
