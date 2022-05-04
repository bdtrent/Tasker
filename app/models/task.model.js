module.exports = (sequelize, Sequelize) => {
    return sequelize.define('tasks', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        assign_date: {
            type: Sequelize.DATE,
        },
        due_date: {
            type: Sequelize.DATE,
        },
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: sequelize.models.groups,
                key: 'groupId'
            }
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
