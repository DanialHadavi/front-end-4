import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "./utils/AxiosWithAuth";
import "./RecipesList.css";

const initialRecipe = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
};

const AddRecipe = (props) => {
  const { push } = useHistory();
  const recipeId = localStorage.getItem("id");
  const [addedRecipe, setAddedRecipe] = useState(initialRecipe);
  const reloadPage = () => {
    window.location.reload();
  };

  const { id } = useParams();
  console.log({ id });
  const handleChange = (e) => {
    e.preventDefault();
    setAddedRecipe({ ...addedRecipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/${id}/recipe/`, addedRecipe)
      .then((res) => {
        setAddedRecipe(res.data);
        push(`/${id}/recipe/`);
        reloadPage();
      })
      .catch((err) => console.log(err, "recipeData failed to return"));
  };

  return (
    <div className="add-recipe">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          placeholder="title"
          onChange={handleChange}
          type="text"
          name="title"
          value={addedRecipe.title}
        ></input>

        <label>Source:</label>
        <input
          placeholder="source"
          onChange={handleChange}
          type="text"
          name="source"
          value={addedRecipe.source}
        ></input>

        <label>Ingredients:</label>
        <textarea
          placeholder="ingredients"
          onChange={handleChange}
          type="text"
          name="ingredients"
          value={addedRecipe.ingredients}
        ></textarea>

        <label>Instructions:</label>
        <textarea
          placeholder="instructions"
          onChange={handleChange}
          type="text"
          name="instructions"
          value={addedRecipe.instructions}
        ></textarea>

        <label>Category:</label>
        <input
          placeholder="category"
          onChange={handleChange}
          type="text"
          name="category"
          value={addedRecipe.category}
        ></input>

        <button className="btn" id="add" type="submit">
          + Add Recipe
        </button>
      </form>
    </div>
  );
};
export default AddRecipe;
