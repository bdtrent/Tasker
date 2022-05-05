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


  app.get("/api/test/user/lists", [authJwt.verifyToken], lists.findAll);
  app.get("/api/test/user/lists/:groupname", [authJwt.verifyToken], lists.findOne);  
  app.post("/api/test/user/lists", [authJwt.verifyToken], lists.create);
  app.put("/api/test/user/edit-list/:groupname", [authJwt.verifyToken], lists.update);
  // Retrieve a single task with id
  app.get("/api/test/user/lists/:groupname/tasks/:id", [authJwt.verifyToken], tasks.findOne);
  // Get all tasks in a specific list
  app.get("/api/test/user/lists/:groupname/tasks", [authJwt.verifyToken], tasks.findAll);
  // Create a new task in a specific list
  app.post("/api/test/user/lists/:groupname/tasks", [authJwt.verifyToken], tasks.create);
  // Update a task with id in a specific list
  app.put("/api/test/user/:groupname/tasks/:id", [authJwt.verifyToken], tasks.update);
  // Delete a task with id in a specific list
  app.delete("/api/test/user/:groupname/tasks/:id", [authJwt.verifyToken], tasks.delete);
}