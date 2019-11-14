import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type Params {
    __typename: String
    page: Int
    pageSize: Int
    sort: String
    order: String
    field1: String
    field2: Int
  }
  extend type query {
    getPaginateEntitiesParams: Params
  }
`;

const paginateEntitiesParamsQuery = gql`
  query PaginateEntitiesParams {
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

export const resolvers = {
  Query: {
    getPaginateEntitiesParams: (parent: any, args: any, { cache }: any) => {
      const { paginateEntitiesParams } = cache.readQuery({
        query: paginateEntitiesParamsQuery
      });

      console.log("getPaginateEntitiesParams", paginateEntitiesParams);
      return paginateEntitiesParams;
    }
  },
  Mutation: {
    setPaginateEntitiesParams: (
      parent: any,
      { params }: any,
      { cache }: any,
      info: any
    ) => {
      console.log("resolver", params);
      cache.writeData({
        data: {
          paginateEntitiesParams: params
        }
      });

      return null;
    }
  }
};
