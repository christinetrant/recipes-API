CREATE DATABASE recipes;

CREATE TABLE Category (
	category_id SERIAL NOT NULL PRIMARY KEY,
	category_name varchar(255)
);

CREATE TABLE Recipe (
	recipe_id SERIAL PRIMARY KEY NOT NULL,
	category_id INT,
	tag_id INT NOT NULL,
	recipe_name varchar(255) NOT NULL,
	recipe_url VARCHAR(255),
	author_id INT NOT NULL,
	recipe_serves INT,
	recipe_calories INT
);

CREATE TABLE Tags (
	tag_id SERIAL PRIMARY KEY NOT NULL,
	tag_name varchar(255) NOT NULL
);

CREATE TABLE Ingredients (
	ingredient_id SERIAL PRIMARY KEY NOT NULL,
	ingredient_name varchar(255) NOT NULL
);

CREATE TABLE Quantity (
	quantity_id SERIAL PRIMARY KEY NOT NULL,
	recipe_id INT NOT NULL,
	ingredient_id INT NOT NULL,
	ingredient_measurement_id INT NOT NULL,
	ingredient_quantity FLOAT NOT NULL
);

CREATE TABLE Measurements (
	measurement_id SERIAL PRIMARY KEY NOT NULL,
	measurement_name varchar(255) NOT NULL
);

CREATE TABLE Method (
	method_id SERIAL PRIMARY KEY NOT NULL,
	recipe_id INT NOT NULL,
	method_number INT NOT NULL,
	method_description TEXT NOT NULL
);

CREATE TABLE Author (
	author_id SERIAL PRIMARY KEY NOT NULL,
	author_name varchar(255) NOT NULL
);

ALTER TABLE Recipe ADD CONSTRAINT Recipe_fk0 FOREIGN KEY (category_id) REFERENCES Category(category_id);

ALTER TABLE Recipe ADD CONSTRAINT Recipe_fk1 FOREIGN KEY (tag_id) REFERENCES Tags(tag_id);

ALTER TABLE Recipe ADD CONSTRAINT Recipe_fk2 FOREIGN KEY (author_id) REFERENCES Author(author_id);

ALTER TABLE Quantity ADD CONSTRAINT Quantity_fk0 FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id);

ALTER TABLE Quantity ADD CONSTRAINT Quantity_fk1 FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id);

ALTER TABLE Quantity ADD CONSTRAINT Quantity_fk2 FOREIGN KEY (ingredient_measurement_id) REFERENCES Measurements(measurement_id);

ALTER TABLE Method ADD CONSTRAINT Method_fk0 FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id);



-- TEST: SINGLE TABLE:
CREATE TABLE Recipe (
	recipe_id SERIAL PRIMARY KEY NOT NULL,
	recipe_name varchar(255) NOT NULL UNIQUE,
	recipe_author varchar(255) NOT NULL,
	recipe_serves INT,
	recipe_calories INT,
	recipe_url VARCHAR(255),
	recipe_category varchar(255),
	recipe_tag varchar(255) NOT NULL,
	recipe_ingredients varchar(255) NOT NULL,
	recipe_method TEXT NOT NULL,
  recipe_date TIMESTAMP NOT NULL
);






-- Recipe -
-- title, author, serves, calories, category, tags, url, ingredients, method

BEGIN TRANSACTION;
-- INSERT INTO user_badges VALUES (1, "SQL Master");
INSERT INTO category(category_name) VALUES ('$cat-name');
INSERT INTO tags(tag_name) VALUES ?;

db.query(sql, [tags], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });


INSERT INTO Ingredients(ingredients_name) VALUES ?;
db.query(sql, [Ingredients], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

INSERT INTO Measurements(measurement_name) VALUES('$measure-name');

INSERT INTO Author(author_name) VALUES('$author-name')

INSERT INTO RECIPE(category_id, tag_id, recipe_name, recipe_url, author_id, recipe_serves, recipe_calories)

INSERT INTO Method(recipe_id, method_number, method_description) VALUES('$ing-name');
db.query(sql, [Method], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

INSERT INTO Quanity(recipe_id, ingredient_id, ingredient_measurement_id, ingredient_quantity) VALUES('$ing-name)


COMMIT;


-- INSERT INTO category(category_name) VALUES ('$cat-name')
-- INSERT INTO tags(tag_name) VALUES('$tag-name') - LOOP?
-- INSERT INTO Ingredients(ingredients_name) VALUES('$ing-name) - LOOP
-- INSERT INTO Measurements(measurement_name) VALUES('$measure-name)
-- INSERT INTO Author(author_name) VALUES('$author-name) - LOOP

-- INSERT INTO RECIPE(category_id, tag_id, recipe_name, recipe_url, author_id, recipe_serves, recipe_calories)
-- INSERT INTO Method(recipe_id, method_number, method_description) VALUES('$ing-name) - LOOP
-- INSERT INTO Quanity(recipe_id, ingredient_id, ingredient_measurement_id, ingredient_quantity) VALUES('$ing-name) - LOOP






















  // db.transaction(trx => {
  //   return (
  //     trx
  //       .insert({ category_name: category })
  //       .into('category')
  //       .returning('category_id')
  //       .then(
  //         // tag_id same for each one relative to recipe
  //         trx.insert({ tag_name: tags }).into('tags').returning('tag_id')
  //       )
  //       .then(
  //         // loop
  //         // insert recipe id? or where = recipe name
  //         trx
  //           .insert({ ingredient_name: ingredients })
  //           .into('ingredients')
  //           .returning('ingredient_id')
  //       )
  //       // .then(
  //       //   // need to link to ingredient or not have?
  //       // trx.insert({ measurement_name: measurement }) .into('measurements')
  //       // .returning('measurement_id')
  //       // )

  //       .then(
  //         trx
  //           .insert({ author_name: author })
  //           .into('author')
  //           .returning('author_id')
  //       )

  //       .then(getRecipe => {
  //         return trx
  //           .insert({
  //             category_id: 'category_id',
  //             tag_id: 'tag_id',
  //             recipe_name: title,
  //             recipe_url: url,
  //             author_id: getRecipe[0],
  //             recipe_serves: serves,
  //             recipe_calories: calories
  //           })
  //           .into('recipe')
  //           .returning('*')
  //           .then(rec => {
  //             res.json(rec[0]);
  //           });
  //         // .then(console.log)
  //       })
  //       // if all successful commit changes otherwise rollback
  //       .then(trx.commit)
  //       .catch(trx.rollback)
  //   );

  //   // .then(
  //   // trx.insert({recipe_id, method_number: ?, method_description: method },  ) .into('method' )

  //   // )

  //   //       .then(
  //   // trx.insert({recipe_id, ingredient_id, ingredient_measurement_id:, ingredient_quantity: quantity }  ) .into('quantity' )

  //   // )
  // }).catch(err => res.status(400).json('error', err));
