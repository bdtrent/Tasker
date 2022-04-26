const db = require("../models");
const Group = db.group;
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
exports.addUser = (req, res) => {
    Group.findOne({
        where: {
            name: req.query.name
        }
    }).then(group => {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
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
            groupname: req.body.groupname
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