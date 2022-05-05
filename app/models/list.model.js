module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
        userId: {
            type: Sequelize.INTEGER,
            required: true,
        },
        title: {
            type: Sequelize.STRING,
        },
    });
    return List;
};