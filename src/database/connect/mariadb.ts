import mariadb from "mysql";
const conn = mariadb.createConnection({
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 0),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export default conn;
