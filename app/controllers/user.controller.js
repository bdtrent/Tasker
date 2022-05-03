const { sequelize } = require("../models");
const db = require("../models");
const User = db.user;
const {Transaction} = require('sequelize');
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.groupBoard = async(req, res) => {
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    try {
        const user = await User.findByPk(req.userId, {transaction: t});

        const groups = await user.getGroups({transaction: t});

        await t.commit();
        res.status(200).send(groups);
    } catch (err) {
        await t.rollback();
        res.status(500).send({message: err.message});
    }
};