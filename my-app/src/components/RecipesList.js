import React, { useState } from "react";
import axiosWithAuth from "./utils/AxiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import "./RecipesList.css";

const initialRecipe = {
  id: "",
  user_id: "",
  recipe_id: "",
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
};

const RecipesList = (props) => {
  const [editing, setEditing] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(initialRecipe);
  const { recipes } = props;

  const { push } = useHistory();
  const { id } = useParams();

  const reloadPage = () => {
    window.location.reload();
  };

  console.log(recipes, "recipes props data");

  const editRecipe = (recipe) => {
    setEditing(true);

    const edit = recipes.find(
      (updatedRecipe) => updatedRecipe.recipe_id === recipe.recipe_id
    );
    setRecipeToEdit(edit);
  };

  const saveEdit = (e) => {
    const newRecipe = {
      title: recipeToEdit.title,
      source: recipeToEdit.source,
      ingredients: recipeToEdit.ingredients,
      instructions: recipeToEdit.instructions,
      category: recipeToEdit.category,
    };
    e.preventDefault();

    axiosWithAuth()
      .put(`/${id}/recipe/${recipeToEdit.recipe_id}`, newRecipe)
      .then((res) => {
        setEditing(false);
        push(`/${id}/recipe/`);
        reloadPage();
      })
      .catch((err) =>
        console.log(
          err,
          "edited recipe failed to return",
          recipeToEdit.recipe_id
        )
      );
  };

  const deleteRecipe = (recipe) => {
    axiosWithAuth()
      .delete(`/${id}/recipe/${recipe.recipe_id}`, recipe)
      .then((res) => {
        console.log("recipe has been returned", res);

        reloadPage();
        alert(`${recipe.title} recipe has been deleted!`);
      })

      .catch((err) => console.log(err, "sorry, recipe could not be returned"));
  };

  const editOnChange = (e) => {
    setRecipeToEdit({
      ...recipeToEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="editForm">
        {editing && (
          <form onSubmit={saveEdit}>
            <h3 className="edit-title">Edit Recipe </h3>
            <input
              name="title"
              placeholder="title"
              value={recipeToEdit.title}
              onChange={editOnChange}
            />

            <input
              onChange={editOnChange}
              name="source"
              placeholder="source"
              value={recipeToEdit.source}
            />

            <textarea
              onChange={editOnChange}
              name="ingredients"
              placeholder="ingredients"
              value={recipeToEdit.ingredients}
            />

            <textarea
              onChange={editOnChange}
              name="instructions"
              placeholder="instructions"
              value={recipeToEdit.instructions}
            />

            <input
              onChange={editOnChange}
              name="category"
              placeholder="category"
              value={recipeToEdit.category}
            />
            <div>
              <button className="btn" type="submit">
                save
              </button>
              <button className="btn" onClick={() => setEditing(false)}>
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {recipes.map((recipe) => (
        <div className="recipelist" key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>Categorty: {recipe.category}</p>
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Source: {recipe.source}</p>

          <button
            className="x-btn"
            onClick={() => {
              deleteRecipe(recipe);
            }}
          >
            <i class="fa fa-trash"> Delete</i>
          </button>
          <button
            className="btn"
            onClick={() => {
              editRecipe(recipe);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
