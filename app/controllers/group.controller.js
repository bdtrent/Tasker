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