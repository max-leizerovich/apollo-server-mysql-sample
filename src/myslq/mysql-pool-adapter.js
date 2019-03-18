import mysql from 'mysql';

export class MysqlPoolAdapter {

    constructor(context) {
        this._context = context;
    }

    getPool() {
        if (this._endPoolPromise) {
            throw 'MysqlPoolAdapter.getPool: _endPoolPromise is up';
        }
        this._pool = this._pool || mysql.createPool(this._context);
        if (!this._pool) {
            throw 'MysqlPoolAdapter.getPool: no _pool';
        }
        return this._pool;
    }

    async query({ sqlString, values = [] }) {
        console.debug('mysql-pool-adapter.query: start', { sqlString, values });
        try {
            const retVal = await new Promise((resolve, reject) =>
                this.getPool().query(
                    sqlString,
                    values,
                    (error, results, fields) => error
                        ? reject({ error, sqlString, values })
                        : resolve({ results, fields })
                )
            );
            console.debug('mysql-pool-adapter.query: returning', { sqlString, values });
            return retVal;
        } catch (e) {
            console.error('mysql-pool-adapter.query', { e, sqlString, values });
            throw e;
        }
    }


    async end() {
        console.debug('mysql-pool-adapter.end: pool ended');
        if (!this._endPoolPromise) {
            console.debug('mysql-pool-adapter.end: init _endPoolPromise');
            this._endPoolPromise = !this._pool
                ? Promise.resolve()
                : new Promise((resolve, reject) =>
                    this._pool.end(
                        (err) => err ? reject(err) : resolve()
                    )
                ).then(() => {
                    console.debug('mysql-pool-adapter.end: pool ended');
                    this._pool = null;
                    this._endPoolPromise = null;
                });
        }

        try {
            await this._endPoolPromise;

        } catch (e) {
            console.debug('mysql-pool-adapter.end', { e });
            throw e;
        }
    }
}
