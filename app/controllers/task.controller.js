const { sequelize } = require("../models");
const db = require("../models");

const List = db.list;
const Op = db.Sequelize.Op;

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


// ------------------------------------------------------
// /**
//  * GET /lists
//  * Purpose: Get all lists
//  */
//  app.get('/lists', authenticate, (req, res) => {
//     // We want to return an array of all the lists that belong to the authenticated user 
//     List.find({
//         _userId: req.user_id
//     }).then((lists) => {
//         res.send(lists);
//     }).catch((e) => {
//         res.send(e);
//     });
// })

// Retrieve all lists from the database.
exports.findAll = (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // TODO: incorporate condition at all?
    Task.findAll({ where: condition })
    // List.findAll({ 
    //   // TODO: fix this later
    //   _userId: req.user_id
    // })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

// /**
//  * POST /lists
//  * Purpose: Create a list
//  */
// app.post('/lists', authenticate, (req, res) => {
//     // We want to create a new list and return the new list document back to the user (which includes the id)
//     // The list information (fields) will be passed in via the JSON request body
//     let title = req.body.title;

//     let newList = new List({
//         title,
//         _userId: req.user_id
//     });
//     newList.save().then((listDoc) => {
//         // the full list document is returned (incl. id)
//         res.send(listDoc);
//     })
// });

// TODO: Update this with correct task model
// Create and Save a new list
exports.create = (req, res) => {
    
  // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a list
    const task = {
      // TODO: update db to reflect title field
      	title: req.body.title,
	  // TODO: Should reflect id of group this list belongs to?
		taskId: req.id,
    };

    // Save task in the database
    List.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the list."
        });
      });
};

// /**
//  * PATCH /lists/:id
//  * Purpose: Update a specified list
//  */
// app.patch('/lists/:id', authenticate, (req, res) => {
//     // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
//     List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
//         $set: req.body
//     }).then(() => {
//         res.send({ 'message': 'updated successfully'});
//     });
// });

// Update a task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating task with id=" + id
        });
      });
};

// /**
//  * DELETE /lists/:id
//  * Purpose: Delete a list
//  */
// app.delete('/lists/:id', authenticate, (req, res) => {
//     // We want to delete the specified list (document with id in the URL)
//     List.findOneAndRemove({
//         _id: req.params.id,
//         _userId: req.user_id
//     }).then((removedListDoc) => {
//         res.send(removedListDoc);

//         // delete all the tasks that are in the deleted list
//         deleteTasksFromList(removedListDoc._id);
//     })
// });

// TODO: Should this also put in a call to delete all tasks within? (see above)
// Delete a list with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    List.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tasks was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });
};
