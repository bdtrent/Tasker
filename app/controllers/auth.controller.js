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
  // Save User to Database
  const t = await sequelize.transaction();
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    }, {transaction: t})

    await t.commit();
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    await t.rollback();
    res.status(500).send({ message: err.message });
  }
};
exports.signin = async(req, res) => {
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    }, {transaction: t});

    await t.commit();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    await t.rollback();
    res.status(500).send({ message: err.message });
  }
};
