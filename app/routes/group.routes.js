const controller = require("../controllers/group.controller");
const {authJwt} = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/group/create", [authJwt.verifyToken], controller.creategroup);
    app.get("/api/group/get", [authJwt.verifyToken], controller.getGroup);
    app.get("api/group/getusers", [authJwt.verifyToken], controller.getGroupUsers);
};