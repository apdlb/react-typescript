import gql from 'graphql-tag';

export const GET_ENTITIES_PAGINATED = gql`
  query GetEntitiesPaginated($filter: JSON!) {
    getEntitiesPaginated(filter: $filter)
    paginateEntitiesParams @client {
      page
      pageSize
      sort
      order
    }
  }
`;
