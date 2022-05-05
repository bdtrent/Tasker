const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const lists = require("../controllers/list.controller.js");
const tasks = require("../controllers/task.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
      	);
      	next();
    });
    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/group", [authJwt.verifyToken], controller.groupBoard);
};
