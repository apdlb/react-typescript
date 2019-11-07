import gql from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';

export const typeDefs = gql`
  type Paginate {
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

export const resolvers = {
  JSON: GraphQLJSON
};
