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
    app.post("/api/group/adduser", [authJwt.verifyToken], controller.addUser);
    app.post("/api/group/removeuser", [authJwt.verifyToken], controller.removeUser);
    app.post("/api/group/delete", [authJwt.verifyToken], controller.deletegroup);
    app.post("/api/group/addrole", [authJwt.verifyToken], controller.addRole);
    app.post("/api/group/updaterole", [authJwt.verifyToken], controller.updateRole);
    app.post("/api/group/deleterole", [authJwt.verifyToken], controller.deleteRole);
    app.post("/api/group/changeuserrole", [authJwt.verifyToken], controller.changeUserRole);
    app.get("/api/group/get", [authJwt.verifyToken], controller.getGroup);
    app.get("/api/group/getusers", [authJwt.verifyToken], controller.getGroupUsers);
    app.get("/api/group/getroles", [authJwt.verifyToken], controller.getGroupRoles);
    app.get("/api/group/getuserrole", [authJwt.verifyToken], controller.getUserRole);
};