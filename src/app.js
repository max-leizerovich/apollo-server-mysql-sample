import { ApolloServer } from 'apollo-server';
import { getApolloServerContext } from './graph-ql/resolvers';
import { MysqlPoolAdapter } from './myslq/mysql-pool-adapter';

// const { MYSQL_CONTEXT } = process.env;
// const mysqlPoolAdapterContext = JSON.parse(MYSQL_CONTEXT);
const mysqlPoolAdapterContext = {
  connectionLimit: 11,
  database: "database",
  host: "host",
  password: "password",
  user: "user",
}

const mysqlPoolAdapter = new MysqlPoolAdapter(mysqlPoolAdapterContext);

const { resolvers, typeDefs } = getApolloServerContext({ mysqlPoolAdapter });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
}).catch(console.error);
