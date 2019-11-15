import { gql } from 'apollo-boost';

import { ENTITIES_PAGINATED, PAGINATE_ENTITIES_PARAMS } from '../graphql/entities';

export const typeDefs = gql`
  type Query {
    entitiesPaginated: JSON
    paginateEntitiesParams: JSON
  }

  type Mutation {
    setEntitiesPaginated(entitiesPaginated: JSON!): JSON
    setPaginateEntitiesParams(params: JSON!): JSON
  }
`;

export const resolvers = {
  Query: {
    entitiesPaginated: (parent: any, args: any, { cache }: any) => {
      const { entitiesPaginated } = cache.readQuery({
        query: ENTITIES_PAGINATED
      });

      return entitiesPaginated;
    },
    paginateEntitiesParams: (parent: any, args: any, { cache }: any) => {
      const { paginateEntitiesParams } = cache.readQuery({
        query: PAGINATE_ENTITIES_PARAMS
      });

      return paginateEntitiesParams;
    }
  },
  Mutation: {
    setEntitiesPaginated: (
      parent: any,
      { entitiesPaginated }: any,
      { cache }: any
    ) => {
      let data = {} as any;
      try {
        data = cache.readQuery({
          query: ENTITIES_PAGINATED
        });
      } catch {}

      data = {
        ...data.entitiesPaginated,
        ...entitiesPaginated
      };

      return data;
    },
    setPaginateEntitiesParams: (
      parent: any,
      { params }: any,
      { cache }: any
    ) => {
      let data = {} as any;
      try {
        data = cache.readQuery({
          query: PAGINATE_ENTITIES_PARAMS
        });
      } catch {}

      data = {
        ...data.paginateEntitiesParams,
        ...params
      };

      return data;
    }
  }
};
