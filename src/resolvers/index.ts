import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Paginate {
    __typename: String
    page: Int
    pageSize: Int
    sort: String
    order: String
    field1: String
    field2: Int
  }

  extend type Query {
    paginateEntitiesParams: Paginate
  }
`;

export const resolvers = {};
