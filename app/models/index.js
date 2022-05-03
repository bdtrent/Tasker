const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT || null,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.group = require("../models/group.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.group.belongsToMany(db.user, {
    through: "user_groups", 
    foreignKey: "groupId",
    otherKey: "userId"
});
db.user.belongsToMany(db.group, {
    through: "user_groups",
    foreignKey: "userId",
    otherKey: "groupId"
});
db.group.hasMany(db.role);
db.role.belongsTo(db.group);
db.user.belongsToMany(db.role, {
    through: "user_roles"
});
db.role.belongsToMany(db.user, {
    through: "user_roles"
});
module.exports = db;