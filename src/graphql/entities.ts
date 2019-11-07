import gql from 'graphql-tag';

export const GET_ENTITIES_PAGINATED = gql`
  {
    getEntitiesPaginated(filter: { page: 1, pageSize: 5 })
    paginateEntitiesParams @client {
      page
      pageSize
      sort
      order
    }
  }
`;
