const { sequelize } = require("../models");
const db = require("../models");

const Task = db.task;
const Group = db.group;
const {Transaction} = require('sequelize');

exports.getTaskForMonth = async (req, res) => {
	if (!('year' in req.query && 'month' in req.query)) {
		res.status(400);
		res.send('Invalid usage');
		return;
	}

  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
  try {
    let [results, meta] = await sequelize.query('SELECT name, description, due_date FROM tasks WHERE YEAR(due_date)=? AND MONTH(due_date)=?', {
      replacements: [Number(req.query.year), Number(req.query.month)]
    });
    await t.commit();
    res.status(200).send(results);
  } catch (err) {
    await t.rollback();
    res.status(500).send({message: err.message});
  }
}

exports.getUsers = (req, res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
  try {
    const task = await Task.findByPk(req.query.task, {
      transaction: t
    });
    const users = await task.getUsers({transaction: t});
    await t.commit();
    res.status(200).send(users);
  } catch (err) {
    await t.rollback();
    res.status(500).send({message: err.message});
  }
}

exports.getGroupTasks = (req,res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
  try {
    const task = await Task.findAll({
      where: {
        groupId: req.query.group
      }
    }, {transaction: t});

    await t.commit();
    res.status(200).send(tasks);
  } catch (err) {
    await t.rollback();
    res.status(500).send({message: err.message});
  }
}

exports.create = (req, res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});
  t.afterCommit(() => {
    res.status(200).send({message: "Task created successfully!"});
  })
  try {
    const task = await Task.create({
      name: req.body.name,
      due_date: req.body.date,
      owner_name: req.body.owner
     }, {transaction: t});

     const group = await Group.findByPk(req.body.group, {transaction: t});

     await group.addTask(task);

     await t.commit();
  } catch (err) {
    await t.rollback();
    res.status(500).send({message: err.message});
  }
};

exports.update = (req, res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
  t.afterCommit(() => {
    res.status(200).send({message: "Task updated successfully!"});
  })
  try {
    const task = await Task.findByPk(req.body.task, {transaction: t});

    await task.update({
      name: req.body.name,
      due_date: req.body.date
    }, {transaction: t});

    await t.commit();
  } catch (err) {
    await t.rollback();
    res.status(500).send({message: err.message});
  }
};

exports.delete = (req, res) => {
  const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
  try {
    await Task.destroy({
      where: {
        id: req.body.task
      }
    }, {transaction: t});

    await t.commit();
    res.status(200).send({message: "Task was deleted!"});
  } catch (err) {
    await t.rollback();
    res.status(500).send({
      message: err.message
    });
  }
};
