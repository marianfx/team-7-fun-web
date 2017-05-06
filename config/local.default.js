module.exports = {

    port: 6996,
    serverURL: 'http://localhost:6996',
    oracle_conn: {
                    adapter: 'sails-oracle-db',
                    user          : "",
                    password      : "",
                    connectString : "localhost:1521/XE"
                },
    oracle_user: {
                    user          : "",
                    password      : "",
                    connectString : "localhost/XE"
    },
    mysql: {
        adapter: 'sails-mysql',
        host: '127.0.0.1',
        user: 'fx', //optional
        password: 'fxfxfx', //optional
        database: 'funweb' //optional
    },
};