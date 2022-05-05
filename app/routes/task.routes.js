const { authJwt } = require('../middleware');
const tasks = require("../controllers/task.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/task/get/month", [authJwt.verifyToken], tasks.getTaskForMonth);
  // Retrieve a single task with id
  app.get("/api/task/get", [authJwt.verifyToken], tasks.findOne);
  app.get("/api/task/users", [authJwt.verifyToken], tasks.getUsers);
  app.get("/api/task/group", [authJwt.verifyToken], tasks.getGroupTasks);
  // Create a new task in a specific list
  app.post("/api/task/create", [authJwt.verifyToken], tasks.create);
  // Update a task with id in a specific list
  app.post("/api/task/update", [authJwt.verifyToken], tasks.update);
  // Delete a task with id in a specific list
  app.delete("/api/task/delete", [authJwt.verifyToken], tasks.delete);
}