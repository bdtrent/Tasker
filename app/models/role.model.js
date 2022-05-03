module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING
        },
        canCreateTasks: {
            type: Sequelize.BOOLEAN
        },
        canEditTasks: {
            type: Sequelize.BOOLEAN
        },
        canModMembers: {
            type: Sequelize.BOOLEAN
        }
    }, {
        indexes: [
            {
                fields: ['groupId']
            }
        ]
    });
    return Role;
};