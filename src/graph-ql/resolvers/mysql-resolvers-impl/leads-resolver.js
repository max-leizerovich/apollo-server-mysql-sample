import { gql } from 'apollo-server';
import { MysqlResolver } from '../mysql-resolvers/mysql-resolver';
import { Leads } from '../../../myslq/tables-adapters/leads';
export class LeadsResolver extends MysqlResolver {

    getResolvers() {
        return {
            mutations: {
                addLead: async (...args) => {
                    const [, { name }] = args;
                    console.log('adding lead...');
                    return 'haha ' + name;
                },
            },
            queries: {
                leads: async (...args) => {
                    const [, { offset, limit }] = args;

                    const { mysqlPoolAdapter } = this;
                    const leads = new Leads({ mysqlPoolAdapter });

                    const { results } = await leads.fetch({ offset, limit });
                    return results;
                },
            },
            typeDefs: gql`
                type Lead {
                    LEAD_ID: String
                    TOKEN_ID: String
                    LEAD_JSON: String
                    DATETIME_UTC: String
                }

                extend type Query {
                    leads(offset: Int = 0, limit: Int = 10): [Lead]
                }

                extend type Mutation {
                    addLead(name: String): String
                }
            `,
        };
    }

};
