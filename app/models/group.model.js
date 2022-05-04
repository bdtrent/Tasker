module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        group_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        owner_name: {
            type: Sequelize.STRING
        }
    });
    return Group;
};