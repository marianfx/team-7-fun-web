module.exports = {

    port: process.env.PORT || 6996,
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
};