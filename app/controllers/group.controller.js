const res = require("express/lib/response");
const { sequelize } = require("../models");
const db = require("../models");
const Group = db.group;
const Role = db.role;
const User = db.user;
const {QueryTypes, Transaction} = require('sequelize');

exports.creategroup = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});
    t.afterCommit(() => {
        res.status(200).send({message: "Group successfully created!"});
    })
    try {
        const group = await Group.create({
            name: req.body.name,
            owner_name: req.body.owner_name
        }, {transaction: t});

        const user = await User.findOne({
            where: {
                username: req.body.owner_name
            }
        }, {transaction: t});

        await user.addGroup(group, {transaction: t});

        await t.commit();

    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};
exports.getGroup = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const group = await Group.findOne({
            where: {
                name: req.query.name
            }
        });

        await t.commit();
        res.status(200).send(group);
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};
exports.getGroupUsers = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const users = await sequelize.query("SELECT users.id, users.username, users.email FROM users JOIN user_groups ON users.id=user_groups.userId WHERE user_groups.groupId=? ORDER BY user_groups.createdAt ASC;", {replacements:[req.query.group], type: QueryTypes.SELECT});
        await t.commit();
        res.status(200).send(users);
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }

};
exports.getGroupRoles = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const roles = await sequelize.query("SELECT * FROM roles WHERE groupId=? ORDER BY createdAt ASC;", {replacements:[req.query.group], type: QueryTypes.SELECT});
        await t.commit();
        res.status(200).send(roles);
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};
exports.getUserRole = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const role = await sequelize.query("SELECT * from roles WHERE id=some(SELECT roleId from user_roles WHERE userId=?) and groupId=?;", { replacements:[req.query.user, req.query.group], type: QueryTypes.SELECT});
        await t.commit();
        res.status(200).send(role);
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }

};


exports.changeUserRole = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    t.afterCommit(() => {
        res.status(200).send({message: "User role changed successfully!"});
    });
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        }, {transaction: t});

        await user.setRoles(req.body.roleId, {transaction: t});

        await t.commit();
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
}
exports.addUser = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const group = await Group.findOne({
            where: {
                name: req.body.groupname
            }
        }, {transaction: t});

        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        }, {transaction: t});

        await user.addGroup(group, {transaction: t});

        await t.commit();
        res.send({message: "User was added to group!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};
exports.removeUser = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const group = await Group.findOne({
            where: {
                name: req.body.groupname
            }
        }, {transaction: t});

        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        }, {transaction: t});

        await user.removeGroup(group, {transaction: t});

        await t.commit();
        res.send({message: "User was removed from grouP!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message:  err.message});
    }
};
exports.deletegroup = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        await Group.destroy({
            where: {
                name: req.body.groupname
            }
        }, {transaction: t});

        await t.commit();

        res.send({message: "Group was deleted!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};

exports.addRole = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});
    try {
        const role = await Role.create({
            name: req.body.name,
            canCreateTasks: req.body.canCreateTasks,
            canEditTasks: req.body.canEditTasks,
            canModMembers: req.body.canModMembers
        }, {transaction: t});

        const group = await Group.findOne({
            where: {
                name: req.body.groupname
            }
        }, {transaction: t});

        await group.addRole(role, {transaction: t});

        await t.commit();
        res.status(200).send({message: "Role was created successfully!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};

exports.updateRole = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        await Role.update({
            name: req.body.name,
            canCreateTasks: req.body.canCreateTasks,
            canEditTasks: req.body.canEditTasks,
            canModMembers: req.body.canModMembers
        }, {
            where: {
                id: req.body.id
            }
        }, {transaction: t});

        await t.commit();
        res.status(200).send({message: "Role updated successfully!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};

exports.deleteRole = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        await Role.destroy({
            where: {
                id: req.body.id
            }
        }, {transaction: t})

        await t.commit();

        res.send({message: "Role was deleted!"});
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};
