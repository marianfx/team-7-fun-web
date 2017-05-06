module.exports = {

    port: 6996,
    //Try with require("os").hostname()
    serverURL: "http://192.168.0.100:6996" ,
    mysql: {
        adapter: 'sails-mysql',
        host: "127.0.0.1",
        user: 'fx', //optional
        password: 'fxfxfx', //optional
        database: 'funweb' //optional
    },
    mysql_full: {
        host: "127.0.0.1",
        user: 'fx', //optional
        password: 'fxfxfx', //optional
        database: 'funweb', //optional
        multipleStatements: true
    },
};