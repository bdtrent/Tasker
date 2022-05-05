const { sequelize, user } = require("../models");
const db = require("../models");

const List = db.list;
const Op = db.Sequelize.Op;
const Task = db.task;
const User = db.user;
const Group = db.group;

exports.getTaskForMonth = async (req, res) => {
	if (!('year' in req.query && 'month' in req.query)) {
		res.status(400);
		res.send('Invalid usage');
		return;
	}

	let [results, meta] = await sequelize.query('SELECT name, description, due_date FROM tasks WHERE YEAR(due_date)=? AND MONTH(due_date)=?', {
		replacements: [Number(req.query.year), Number(req.query.month)]
	});
	res.send(results);
}

exports.getUsers = (req, res) => {
  Task.findByPk(req.query.task).then(task => {
    task.getUsers().then(users => {
      res.status(200).send(users);
    })
  }).catch(err => {
    res.status(500).send({message: err.message});
  })
}

exports.getGroupTasks = (req,res) => {
  Task.findAll({
    where: {
      groupId: req.query.group
    }
  }).then(tasks => {
    res.status(200).send(tasks);
  }).catch(err => {
    res.status(500).send({message: err.message});
  })
}

exports.create = (req, res) => {
  const group = Group.findByPk(req.body.group);
   Task.create({
    name: req.body.name,
    due_date: req.body.date,
    owner_name: req.body.owner
   }).then(task => {
     group.addTask(task);
     res.status(200).send({message: "Task created successfully!"});
   }).catch(err => {
     res.status(500).send({message: err.message});
   })
};

exports.update = (req, res) => {
    Task.findByPk(req.body.task).then( task => {
      task.update({
        name: req.body.name,
        due_date: req.body.date
      });
      res.status(200).send({message: "Task updated successfully!"});
    }).catch(err => {
      res.status(500).send({message: err.message});
    })
};

exports.delete = (req, res) => {
    Task.delete({
      where: {
        id: req.body.task
      }
    }).then(response => {
      res.status(200).send({
        message: "Task deleted successfully!"
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    })
};
