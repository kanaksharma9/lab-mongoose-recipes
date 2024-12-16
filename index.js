// index.js

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const recipes = require('./data.json'); // Import recipes from data.json


mongoose.connect('mongodb://localhost:27017/recipeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connected');

  const newRecipe = {
    title: 'Spaghetti Bolognese',
    level: 'Amateur Chef',
    ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'],
    cuisine: 'Italian',
    dishType: 'main_course',
    image: 'https://example.com/spaghetti.jpg',
    duration: 45,
    creator: 'Chef John'
  };

  // Create the new recipe
  Recipe.create(newRecipe)
    .then(recipe => {
      console.log(`Recipe created: ${recipe.title}`);
      mongoose.connection.close();
      // Iteration 3: Insert multiple recipes
      Recipe.insertMany(recipes)
        .then(insertedRecipes => {
          insertedRecipes.forEach(recipe => {
            console.log(`Recipe created: ${recipe.title}`);
          });
          mongoose.connection.close();

          // Iteration 4: Update a recipe
          Recipe.findOneAndUpdate(
            { title: 'Rigatoni alla Genovese' }, 
            { duration: 100 },
            { new: true }
          )
          .then(updatedRecipe => {
            console.log(`Updated Recipe: ${updatedRecipe.title}`);
            mongoose.connection.close();

            // Iteration 5: Remove a recipe
            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then(() => {
                console.log('Carrot Cake has been removed from the database');
                mongoose.connection.close();
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})
.catch(err => console.log('Database connection error:', err));
