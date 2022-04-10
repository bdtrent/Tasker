const db = require("../models");
const Group = db.group;
exports.creategroup = (req, res) => {
    Group.create({
        name: req.body.name,
        owner_name: req.body.owner_name,
        members: req.body.members
    })
    .then(group => {
        res.send({ message: "Group was created successfully!"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};