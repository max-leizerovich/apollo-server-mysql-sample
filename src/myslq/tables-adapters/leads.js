export class Leads {
    constructor({ mysqlPoolAdapter }) {
        this.adapter = mysqlPoolAdapter;

    }
    async fetch({ offset, limit }) {
        const { adapter } = this;
        try {
            const { results, fields } = await adapter.query({
                sqlString: 'SELECT * FROM  leads LIMIT ? OFFSET  ?;',
                values: [limit, offset],

            });
            return { results, fields };
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
