const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.groupBoard = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getGroups().then(groups => {
            res.status(200).send(groups);
        })
    })
};