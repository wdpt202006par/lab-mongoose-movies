const express = require("express");

// require celebrities model
const router = express.Router();
const Celebrity = require("../models/celebrity");

/* iteration 2 */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((allCelebritiesFromDB) => {
      console.log("here are the celebrities", allCelebritiesFromDB);
      res.render("celebrities/index", {
        celebrities: allCelebritiesFromDB,
      });
    })
    .catch((err) => {
      console.log("not working", err);
      next(err);
    });
});

//iteration 3
router.get("/celebrities/:artistId", (req, res, next) => {
  const id = req.params.artistId;
  Celebrity.findOne({ _id: id })
    .then((celebrity) => {
      res.render("celebrities/show", { celebrity: celebrity });
    })
    .catch((err) => next());
});

module.exports = router;
