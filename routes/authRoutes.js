const express = require('express');
const router = express.Router();
const passport = require('passport'); 
require('../config/passport'); 

router.get("/Auth", (req, res) => {
    res.render("Auth");
});

router.post("/Auth", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/Auth",
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/Auth');
    });
});

module.exports = router;
