import gql from 'graphql-tag';

export const GET_ENTITIES_PAGINATED = gql`
  query GetEntitiesPaginated($filter: JSON!) {
    getEntitiesPaginated(filter: $filter)
  }
`;

export const SET_PAGINATE_ENTITIES_PARAMS = gql`
  mutation SetPaginateEntitiesParams($params: JSON) {
    setPaginateEntitiesParams(params: $params) @client
  }
`;

export const GET_PAGINATE_ENTITIES_PARAMS = gql`
  query GetPaginateEntitiesParams {
    getPaginateEntitiesParams @client {
      page
      pageSize
      sort
      order
      field1
      field2
    }
  }
`;

/********************************************** TEST */
export const ENTITIES_PAGINATED = gql`
  query entitiesPaginated {
    entitiesPaginated @client
  }
`;

export const SET_ENTITIES_PAGINATED = gql`
  mutation setEntitiesPaginated($entitiesPaginated: JSON!) {
    setEntitiesPaginated(entitiesPaginated: $entitiesPaginated) @client
  }
`;
