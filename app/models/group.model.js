module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        owner_id: {
            type: Sequelize.INTEGER
        }
    });
    return Group;
};