import { createMysqlResolversContext } from './mysql-resolvers/mysql-resolvers-factory';
import { baseTypeDefs } from './type-defs';

export function getApolloServerContext({ mysqlPoolAdapter }) {
    const { typeDefs, query, mutation, } = createMysqlResolversContext({ mysqlPoolAdapter });
    return {
        typeDefs: [baseTypeDefs, ...typeDefs],
        resolvers: {
            Query: query,
            Mutation: mutation,
        }
    };
}
