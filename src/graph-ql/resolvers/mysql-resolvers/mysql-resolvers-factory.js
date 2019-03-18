import { getResolvers } from '../mysql-resolvers-impl';

export function createMysqlResolversContext({ mysqlPoolAdapter }) {

    const resolvers = getResolvers();
    const resolversInstances = resolvers.map(
        resolver => new resolver({ mysqlPoolAdapter })
    );

    const { query, mutation, typeDefs } = resolversInstances
        .map(resolverInstance => resolverInstance.getResolvers())
        .reduce(
            (sum, { queries, mutations, typeDefs }) => ({
                query: { ...sum.query, ...queries },
                mutation: { ...sum.mutation, ...mutations },
                typeDefs: [...sum.typeDefs, typeDefs],
            }),
            {
                query: {},
                mutation: {},
                typeDefs: [],
            },
        );

    return { typeDefs, query, mutation, };

}

