const express = require('express');
const bodyParser = require('body-parser');

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

db.select('*')
  .from('recipe')
  .then(data => {
    console.log(data);
  });

const app = express();

app.use(bodyParser.json());

// test user:
const database = {
  recipes: [
    {
      id: '1',
      title: "Nana's Scones",
      author: 'Kitty Gallagher',
      serves: null,
      calories: null,
      category: 'snacks',
      tags: ['family', 'snacks'],
      url: null,
      ingredients: [
        '10 Tbsp self raising flour',
        '2 Tbsp sugar',
        '2 Tbsp heaped butter',
        '2 eggs',
        '1/4 cup milk'
      ],
      method: [
        'Preheat oven to 200°C',
        'Lightly flour a flat baking tin',
        'Sieve flour into baking bowl, add sugar',
        'Using fingers mix it all up and crumble handfuls from up high to allow air to come through  as it falls back down into bowl',
        'In a jug beat eggs and milk and slowly add to mixture, keep a small amount to brush over top of scones',
        'When dough is ready, flour work surface and roll out dough (not too thin) and cut out scones',
        'Brush tops with egg and place in middle shelf of oven to bake for approx 10 mins'
      ]
    },
    {
      id: '2',
      title: 'Red Lentil Dahl',
      author: 'Happy Pear',
      serves: '6',
      calories: null,
      category: 'main',
      tags: ['curry', 'dinner'],
      url: 'https://thehappypear.ie/recipes/red-lentil-dahl/',
      ingredients: [
        '500 g red lentils',
        '2 red onions',
        '3 cloves of garlic',
        '0.5 a thumb-size piece of ginger',
        '1 courgette',
        '4 medium ripe tomatoes',
        '2 tsp salt',
        '2 tsp ground cumin',
        'pinch of cayenne pepper',
        '1 tsp ground turmeric',
        '3 tsp medium curry powder',
        '1 tsp freshly ground black pepper',
        '3 tbsp tamari',
        'juice of 1 lime',
        'small bunch of fresh coriander',
        '2 litres water'
      ],
      method: [
        'Peel and finely slice the onions, garlic and ginger. Cut the courgette into bite-size pieces and roughly chop the tomatoes',
        'Saute the onions, garlic and ginger in 4 tbsp of water in a large pan on a high heat for 5 minutes. Stir regularly, adding more water if they start to stick to the bottom of the pan. When the onions are soft, add the courgette, tomatoes and 1 tsp salt. Cover the pan and cook gently over a low heat for 5-10 minutes, stirring occasionally.',
        'Add the lentils, spices, tamari, lime juice, the remaining salt and 2 litres of water, and bring to the boil. Reduce to a low heat and simmer for 25 minutes, or until you are happy with the texture of the dahl. Stir regularly, as lentils have a tendency to stick',
        'Finely chop the coriander and sprinkle over the dahl. Serve with brown rice or toasted wholemeal pitta breads, cut into soldiers. Mango chutney is also a nice accompaniment'
      ]
    }
  ]
};

app.get('/', (req, res) => {
  // res.send('this is working');
  return res.send(database.recipes);

  // const { id } = req.params;
  // // let found = false;
  // // map or filter better option
  // database.recipes.forEach(recipe => {
  //   if (recipe.id === id) {
  //     // found = true;
  //     return res.json(recipe);
  //   }
  // });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  // map or filter better option
  database.recipes.forEach(recipe => {
    if (recipe.id === id) {
      found = true;
      return res.json(recipe);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
});

app.listen(3000, () => {
  console.log('app is running on Port 3000');
});

// app.post('/signin', (req, res) => {
//   if (
//     req.body.email === database.users[0].email &&
//     req.body.password === database.users[0].password
//   ) {
//     res.json('signing in!');
//   } else {
//     res.status(400).json('error logging in');
//   }
// });

app.post('/create', (req, res) => {
  // we want info from req.body
  // const { email, name, password } = req.body;
  // database.users.push({
  //   id: 3,
  //   name: name,
  //   email: email,
  //   password: password,
  //   joined: new Date()
  // });
  const { name, url, serves, calories } = req.body;
  // db('recipe')
  //   .insert({
  //     recipe_name: name,
  //     recipe_url: url,
  //     recipe_serves: serves,
  //     recipe_calories: calories
  //   })
  // .then(console.log);
  // res.send('this is working');
  res.send(database.recipes);
  // res.json(database.users[database.users.length - 1]);
});

// Plan API - what does the design need to look like

// Route - responds with this is working
// Sign in - POST user info, res- success or fail
// Register - POST - add data to db, res- return new user data
// profile/:userId - GET, res- user info

// recipes - edit PUT update recipe info?
