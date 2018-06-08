const sqlDb = require("mssql");
const settings = require("../config/dbConfig");

exports.querySql = (sql, callback, multiple) => {
    const conn = new sqlDb.ConnectionPool(settings.dbConfig);

    conn.connect().then(() => {

        let req = new sqlDb.Request(conn);
        req.multiple = multiple;

        req.query(sql).then((data) => {

            callback(data);

        }).catch((err) => {
            console.log(err);
            callback(null, err);
        });
    }).catch((err) => {
        console.log(err);
        callback(null, err);
    });
};