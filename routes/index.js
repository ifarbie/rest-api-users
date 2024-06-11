const router = require('express').Router();

const routes = [require('./user.route'), require('./login.route')];
for(route of routes) {
    router.use("/api", route);
}

module.exports = router;