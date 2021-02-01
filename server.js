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
// test database:
// const database = {
//   recipes: [
//     {
//       id: '1',
//       title: "Nana's Scones",
//       author: 'Kitty Gallagher',
//       serves: null,
//       calories: null,
//       category: 'snacks',
//       tags: ['family', 'snacks'],
//       url: null,
//       ingredients: [
//         '10 Tbsp self raising flour',
//         '2 Tbsp sugar',
//         '2 Tbsp heaped butter',
//         '2 eggs',
//         '1/4 cup milk'
//       ],
//       method: [
//         'Preheat oven to 200°C',
//         'Lightly flour a flat baking tin',
//         'Sieve flour into baking bowl, add sugar',
//         'Using fingers mix it all up and crumble handfuls from up high to allow air to come through  as it falls back down into bowl',
//         'In a jug beat eggs and milk and slowly add to mixture, keep a small amount to brush over top of scones',
//         'When dough is ready, flour work surface and roll out dough (not too thin) and cut out scones',
//         'Brush tops with egg and place in middle shelf of oven to bake for approx 10 mins'
//       ]
//     },
//     {
//       id: '2',
//       title: 'Red Lentil Dahl',
//       author: 'Happy Pear',
//       serves: '6',
//       calories: null,
//       category: 'main',
//       tags: ['curry', 'dinner'],
//       url: 'https://thehappypear.ie/recipes/red-lentil-dahl/',
//       ingredients: [
//         '500 g red lentils',
//         '2 red onions',
//         '3 cloves of garlic',
//         '0.5 a thumb-size piece of ginger',
//         '1 courgette',
//         '4 medium ripe tomatoes',
//         '2 tsp salt',
//         '2 tsp ground cumin',
//         'pinch of cayenne pepper',
//         '1 tsp ground turmeric',
//         '3 tsp medium curry powder',
//         '1 tsp freshly ground black pepper',
//         '3 tbsp tamari',
//         'juice of 1 lime',
//         'small bunch of fresh coriander',
//         '2 litres water'
//       ],
//       method: [
//         'Peel and finely slice the onions, garlic and ginger. Cut the courgette into bite-size pieces and roughly chop the tomatoes',
//         'Saute the onions, garlic and ginger in 4 tbsp of water in a large pan on a high heat for 5 minutes. Stir regularly, adding more water if they start to stick to the bottom of the pan. When the onions are soft, add the courgette, tomatoes and 1 tsp salt. Cover the pan and cook gently over a low heat for 5-10 minutes, stirring occasionally.',
//         'Add the lentils, spices, tamari, lime juice, the remaining salt and 2 litres of water, and bring to the boil. Reduce to a low heat and simmer for 25 minutes, or until you are happy with the texture of the dahl. Stir regularly, as lentils have a tendency to stick',
//         'Finely chop the coriander and sprinkle over the dahl. Serve with brown rice or toasted wholemeal pitta breads, cut into soldiers. Mango chutney is also a nice accompaniment'
//       ]
//     }
//   ]
// };

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
// app.delete('/:id', (req, res) => {
//   console.log('params', req.params);
//   console.log('body', req.body);
//   // need recipe id to delete the right recipe
//   const { id } = req.params;

//   db('recipe')
//     .where('recipe_id', '=', id)
//     .del()
//     // .returning('recipe')
//     // .then(data => {
//     //   // console.log(entries[0]);
//     //   res.json(data);
//     // })
//     .catch(err => res.status(400).json('Unable to delete'));

// Once deleted we want to get the updated db and return
// db.whereExists(db.select('*').from('recipe').whereRaw('count(1)'));
// // want to return database of all recipes:
// return db
//   .select('*')
//   .from('recipe')
//   .orderBy('recipe_date', 'desc')
//   .then(recipes => res.send(recipes));
//   return db('recipe');
// });

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
