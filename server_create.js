app.post('/create', (req, res) => {
  // we want info from req.body
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

  db('recipe')
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
    .then(console.log);
  res.send('this is sending');
  return db('recipe');
});
