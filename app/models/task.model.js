module.exports = (sequelize, Sequelize) => {
    return sequelize.define('tasks', {
        task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
                key: 'group_id'
            }
        }
    });
};
