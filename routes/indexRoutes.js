const express = require('express');
const ensureAuthenticated = require('../middlewares/auth');
const router = express.Router();
const path = require('path');
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("index",{isAdmin: req.user.isAdmin}); 
});

module.exports = router;
