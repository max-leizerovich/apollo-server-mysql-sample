# Boilerplate for a node project with Apollo(GraphQL)+Mysql, babel, jest,  debuggable in VSCode
Open the project in vs code, run npm instal and thats it

## to configure db connection
go to 'src/app.js' file and edit mysqlPoolAdapterContext, for deferent options see:
https://www.npmjs.com/package/mysql

## to add resolvers for different tables in db, etc.
see for example:  src/graph-ql/resolvers/mysql-resolvers-impl/leads-resolver.js
add new implementations similar to leads-resolver to src/graph-ql/resolvers/mysql-resolvers-impl/index.js and it will automatically be added to apollo server

## to add mysql adapter
no real need - resolvers can use MysqlPoolAdapter directly (injected to ctor) - or implement something similar to src/myslq/tables-adapters/leads.js

## Explanation on resolver implementation
each resolver implements MysqlResolver - see leads-resolver as an example
