const { Router } = require('express');
const router = new Router();
const Movie = require('./model')


// Insert records into Movie table
router.post("/movies", (req, res, next) => {
    Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(next)
  });

// Read all the records from Movie table
router.get('/movies', (req, res, next) => {
    const limit = req.query.limit || 3
    const offset = req.query.offset || 0
    Movie.findAndCountAll({limit, offset})
    .then(movie => {
        res.send({data : movie.rows, total: limit});
      })
    .catch(next);
  });

// Read only one record thru id 
router.get('/movies/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
    .then(movie => {
        if(movie) res.send(movie); // if id is found then send details of movie with requested id
        res.status(404).end();  // else send requested id not found 
      })
    .catch(next);
  });

//Update the record thru movie id
router.put('/movies/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
    .then(movie => {
        console.log("Movie found :", movie)
        if (movie) {
            movie
            .update(req.body)
            .then(movie => res.json(movie));
        } else {
            res.status(404).end();
        }
      })
    .catch(next);
  });

//Delete the record thru movie id
router.delete("/movies/:id", (req, res, next) => {
    Movie.destroy({
        where: {
          id: req.params.id,
        }
      })
    .then(movie => {
        if (movie) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      })
    .catch(next);
    });

module.exports = router