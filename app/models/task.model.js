module.exports = (sequelize, Sequelize) => {
    return sequelize.define('tasks', {
        name: {
            type: Sequelize.STRING,
        },
        due_date: {
            type: Sequelize.DATE,
        },
        owner_name: {
            type: Sequelize.STRING,
            references: {
                model: sequelize.models.users,
                key: 'username',
            }
        }
    });
};
