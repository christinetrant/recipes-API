// Express Database integration
const express = require('express');
const bodyParser = require('body-parser');
// to avoid cors errors
const cors = require('cors');
// to use SQL
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'recipes'
  }
});

// db.select('*')
//   .from('recipe')
//   .then(data => {
//     console.log(data);
//   });

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Home - select recipes and show by last entered
app.get('/', (req, res) => {
  // console.log(req.params);
  // res.send('this is working');
  // return res.send(database.recipes);
  // check if database is empty:
  // select count(1) where exists (select * from recipe)
  db.whereExists(db.select('*').from('recipe').whereRaw('count(1)'));
  // want to return database of all recipes:
  return (
    db
      .select('*')
      .from('recipe')
      // .orderBy('recipe_date', 'desc')
      .orderBy('recipe_id', 'desc')
      .then(recipes => res.send(recipes))
  );
});

// // to delete:
app.delete('/:id', (req, res) => {
  console.log('params', req.params);
  console.log('body', req.body);
  // need recipe id to delete the right recipe
  const { id } = req.params;

  db('recipe')
    .where('recipe_id', '=', id)
    .del()
    // .returning('recipe')
    // .then(data => {
    //   // console.log(entries[0]);
    //   res.json(data);
    // })
    .catch(err => res.status(400).json('Unable to delete'));

  // Once deleted we want to get the updated db and return
  db.whereExists(db.select('*').from('recipe').whereRaw('count(1)'));
  // want to return database of all recipes:
  return db
    .select('*')
    .from('recipe')
    .orderBy('recipe_id', 'desc')
    .then(recipes => res.send(recipes));
  // return db('recipe');
});

app.listen(3000, () => {
  console.log('app is running on Port 3000');
});

// When user creates a new recipe - input into database and return to website
app.post('/create', (req, res) => {
  // we want info from req.body
  // console.log('body', req.body);
  // console.log('params', req.params);
  let {
    title,
    author,
    serves,
    calories,
    category,
    tags,
    url,
    ingredients,
    method
  } = req.body;
  // change arrays into strings separated by ';;;'
  tags = tags.join(';;;');
  ingredients = ingredients.join(';;;');
  method = method.join(';;;');

  db.transaction(trx => {
    // insert new recipe into database
    trx
      .insert([
        {
          recipe_name: title,
          recipe_author: author,
          recipe_serves: serves,
          recipe_calories: calories,
          recipe_url: url,
          recipe_category: category,
          recipe_tag: tags,
          recipe_ingredients: ingredients,
          recipe_method: method
        }
      ])
      .into('recipe')
      .returning('*')
      .then(user => {
        // console.log(user[0]);
        // If array of user is not 0 (empty)
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json('Not found');
        }
      })
      .then(recipes => res.send(recipes))
      .then(trx.commit)
      .catch(trx.rollback);
  });

  return db('recipe');
});

// recipes - edit PUT update recipe info?

/**
 * db('recipe')
    .insert([
      {
        recipe_name: title,
        recipe_author: author,
        recipe_serves: serves,
        recipe_calories: calories,
        recipe_url: url,
        recipe_category: category,
        recipe_tag: tags,
        recipe_ingredients: ingredients,
        recipe_method: method
      }
    ])
    .returning('*')

    // .then(console.log);
    // then we want to return newly created recipe back to website:
    .then(
      db('recipe')
        .select('*')
        .from('recipe')
        .where('recipe_name', '=', title)
        .then(recipe => {
          res.json(recipe[0]);
          console.log('reeee', recipe[0]);
        })
        .catch(err => res.status(400).json('Unable to get recipe'))
    );
  // res.json('this is sending');
  // return db('recipe');
 */
