export class MysqlResolver {
    constructor({ mysqlPoolAdapter }) {
        this.mysqlPoolAdapter = mysqlPoolAdapter;
    }
    /**
     * returns the resolver implementation
     * @returns {
     *  mutations: { String -> Function },
     *  queries: { String -> Function},
     *  typeDefs: gql``,
     * }
     */
    getResolvers() {
        throw 'MysqlResolver.getResolvers: not implemented';
    }

}
