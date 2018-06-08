exports.dbConfig = {
    user: "sa",
    password: "sa",
    server: "192.168.25.170\\sqlexpress",
    database: "sgi",
    port: "1433",
    connectionTimeout: 500000,
    requestTimeout: 500000,
    pool: {
        idleTimeoutMillis: 500000,
        max: 100
    },
    options: {
        encrypt: false
    }
};