const db = require("../models");
const List = db.list;
const Op = db.Sequelize.Op;

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
    List.findAll({ where: condition })
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
          err.message || "Some error occurred while retrieving lists."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  List.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find List with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving List with id=" + id
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
    const list = {
      // TODO: update db to reflect title field
      title: req.body.title,
	  // TODO: Should reflect id of group this list belongs to?
	    listId: req.id,
    };

    // Save task in the database
    List.create(list)
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

// Update a list by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    List.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update list with id=${id}. Maybe list was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating list with id=" + id
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
