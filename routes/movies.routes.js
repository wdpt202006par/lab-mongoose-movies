const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/celebrity.model");

// GET /movies/create
router.get("/movies/new", (req, res, next) => {
  // Affichage du formulaire de creation
  Celebrity.find({})
    .then((celebritiesFromDb) => {
      // console.log('authors retrouvés', authorsFromDb)
      res.render("movies/new", {
        celebrities: celebritiesFromDb, // [ {...}, {...} ]
      });
    })
    .catch((err) => next(err));
});

// POST /movies/new
router.post("/movies/new", (req, res, next) => {
  // traitement du formulaire

  // const title = req.body.title
  // const genre = req.body.genre
  // const plot = req.body.plot
  // const cast = req.body.cast

  // Destructure req.body en 4 variables
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      // res.send(`movie ${new.title} créé`)
      res.redirect("movies/index");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allTheMoviesFromDB) => {
      console.log("Retrieved movies from DB:", allTheMoviesFromDB);
      res.render("/movies/index", { movies: allTheMoviesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
