module.exports = {
    HOST: "127.0.0.1",
    PORT: 4444,
    USER: "tasker",
    PASSWORD: "tasker",
    DB: "tasker",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}