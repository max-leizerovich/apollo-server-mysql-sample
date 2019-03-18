import { gql } from 'apollo-server';

export const baseTypeDefs = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    type Mutation {
        _: String
    }

    type Query {
        _: String
    }
`;
