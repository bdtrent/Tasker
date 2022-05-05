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
// Team changes (open)
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
// Team changes (close)
// My Changes (open)
// TODO: Need groups implemented
db.list = require("../models/list.model.js")(sequelize, Sequelize);

// ASSIGNED
// Roles to Users
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
// Users to Roles
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "groupId"
});
// My Changes (close)

db.group.hasMany(db.role);
db.role.belongsTo(db.group);
db.user.belongsToMany(db.role, {
    through: "user_roles"
});
db.role.belongsToMany(db.user, {
    through: "user_roles"
});
// team changes open
db.task.belongsTo(db.group);
db.group.hasMany(db.task);

db.task.belongsToMany(db.user, {
    through: "user_tasks"
});
db.user.belongsToMany(db.task, {
    through: "user_tasks"
});
// team chances close


// my changes open

// TODO: Need groups implemented
// TODO: temporary stand-in for groups right now
// OWNED
// Lists to Users

// ASSIGNMENT
// Lists to Tasks
// Todo: Adjust these?
// Tasks to Lists

// TODO: need to implement HAS relationship between users/tasks
// HAS

// my changes close
module.exports = db;