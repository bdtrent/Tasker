const res = require("express/lib/response");
const { sequelize } = require("../models");
const db = require("../models");
const Group = db.group;
const Role = db.role;
const User = db.user;
exports.creategroup = (req, res) => {
    console.log(req.name)
    Group.create({
        name: req.body.name,
        owner_name: req.body.owner_name
    })
    .then(group => {
        User.findOne({
            where: {
                username: req.body.owner_name
            }
        })
            .then(user => {
                user.addGroup(group);
            })
        res.send({ message: "Group was created successfully!"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
exports.getGroup = (req, res) => {
    Group.findOne({
        where: {
            name: req.query.name
        }
    }).then(group => {
        res.status(200).send(group);
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
};
exports.getGroupUsers = (req, res) => {
    Group.findOne({
        where: {
            name: req.query.name
        }
    }).then(group => {
        group.getUsers().then(users => {
            res.status(200).send(users);
        });
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
};
exports.getGroupRoles = (req, res) => {
    Group.findOne({
        where: {
            name: req.query.name
        }
    }).then(group => {
        group.getRoles().then(roles => {
            res.status(200).send(roles);
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
};
exports.getUserRole = (req, res) => {
    User.findOne({
        where: {
            username: req.query.username
        }
    }).then(user => {
        user.getRoles({
            where: {
                groupId: req.query.group
            }
        }).then(role => {
            res.status(200).send(role);
        })
    });
    /*
    const {QueryTypes} = require('sequelize');
    const role = sequelize.query("SELECT * FROM roles WHERE roles.id = some(SELECT roleId FROM user_roles WHERE user_roles.userId=(SELECT id FROM users WHERE users.username=?)) and groupId=(SELECT id FROM groups WHERE groups.name=?)", { replacements:[req.query.username, req.query.group], type: QueryTypes.SELECT});
    res.status(200).send(role);
    */
};


exports.changeUserRole = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        user.setRoles(req.body.roleId);
        res.status(200).send({message: "User role was changed successfully!"});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}
exports.addUser = (req, res) => {
    console.log(req);
    Group.findOne({
        where: {
            name: req.body.groupname
        }
    }).then(group => {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            console.log(group);
            console.log(user);
            user.addGroup(group);
        })
        res.send({message: "User was added to group!"});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
};
exports.removeUser = (req, res) => {
    Group.findOne({
        where: {
            name: req.body.groupname
        }
    }).then(group => {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            user.removeGroup(group);
        })
        res.send({message: "User was removed from grouP!"});
    })
    .catch(err => {
        res.status(500).send({message:  err.message});
    });
};
exports.deletegroup = (req, res) => {
    Group.destroy({
        where: {
            name: req.body.groupname
        }
    }).then(response => {
        if(response == 1) {
            res.send({message: "Group was deleted!"});
        }
        else {
            res.status(500).send({message: "Group could not be deleted!"});
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });  
};

exports.addRole = (req, res) => {
    Role.create({
        name: req.body.name,
        canCreateTasks: req.body.canCreateTasks,
        canEditTasks: req.body.canEditTasks,
        canModMembers: req.body.canModMembers
    })
    .then(role => {
        Group.findOne({
            where: {
                name: req.body.groupname
            }
        })
        .then(group => {
            group.addRole(role);
            res.status(200).send({message: "Role was created successfully!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
};

exports.updateRole = (req, res) => {
    Role.update({
        name: req.body.name,
        canCreateTasks: req.body.canCreateTasks,
        canEditTasks: req.body.canEditTasks,
        canModMembers: req.body.canModMembers
    }, {
        where: {
            id: req.body.id
        }
    })
    .then(role => {
        res.status(200).send({message: "Role updated successfully!"});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.deleteRole = (req, res) => {
    Role.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(response => {
        if(response == 1) {
            res.send({message: "Role was deleted!"});
        }
        else {
            res.status(500).send({message: "Role could not be deleted!"});
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });  
};
