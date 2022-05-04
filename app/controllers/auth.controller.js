const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {Transaction} = require('sequelize');
const { sequelize } = require("../models");
exports.signup = async(req, res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});
  t.afterCommit(() => {
    res.send({message: "User was registered successfully!"});
  })
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    }, {transaction: t});

    await t.commit();
  } catch (err) {
    await t.rollback();
    res.status(500).send({ message: err.message });
  }
};
exports.signin = async(req, res) => {
  try {
    const result = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED}, async (t) => {
      const user = await User.findOne({
        where: {
          username: req.body.username
        }
      }, {transaction: t});

      return user;
    });

    if (!result) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: result.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: result.id,
      username: result.username,
      email: result.email,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
