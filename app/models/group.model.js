module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        name: {
            type: Sequelize.STRING
        },
        owner_name: {
            type: Sequelize.STRING
        }
    });
    return Group;
};