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