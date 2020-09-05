const express = require("express");

// require celebrities model
const router = express.Router();
const Celebrity = require("../models/celebrity");

/* iteration 2 */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((allCelebritiesFromDB) => {
      console.log(allCelebritiesFromDB);
      res.render("celebrities/index", {
        celebrities: allCelebritiesFromDB,
      });
    })
    .catch((err) => {
      console.log("not working", err);
      next(err);
    });
});

module.exports = router;
