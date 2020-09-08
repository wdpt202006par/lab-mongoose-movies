const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

// GET /celebrities/create
router.get("/celebrities/new", (req, res, next) => {
  // Affichage du formulaire de creation
  res.render("celebrities/new");
});
// POST /celebritiess/create
router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCelebrity) => {
      res.send(`celibitie ${newCelebrity.name} créé`);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((theCelebrity) =>
      res.render("celebrities/show", { celebrity: theCelebrity })
    )
    .catch((error) => {
      console.log("Error while retrieving celebrity details: ", error);
      next(error);
    });
});
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
      console.log("Retrieved Celebrities from DB:", allTheCelebritiesFromDB);
      res.render("celebrities/index", { celebrities: allTheCelebritiesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the Celebrities from the DB: ", error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
