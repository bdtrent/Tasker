module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tasks", {
        name: {
            type: Sequelize.STRING
        }
    });
};
