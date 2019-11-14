import { gql } from 'apollo-boost';

import entities from './entities.json';

export const typeDefs = gql`
  type Query {
    entitiesPaginated: JSON
  }

  type Mutation {
    setEntitiesPaginated(object: JSON!): JSON
  }
`;

export const resolvers = {
  Query: {
    entitiesPaginated: () => entities.entitiesPaginated
  },
  Mutation: {
    setEntitiesPaginated: (parent: any, { entitiesPaginated }: any) => {
      entities.entitiesPaginated = entitiesPaginated;

      return entities.entitiesPaginated;
    }
  }
};
