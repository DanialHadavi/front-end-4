import React, { useState } from "react";
import axiosWithAuth from "./utils/AxiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import './RecipesList.css'

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
  const [newRecipe, setNewRecipe] = useState({});
  const { recipes } = props;

  const { push } = useHistory();
  const { id } = useParams();

  const reloadPage = () => {
    window.location.reload();
  };


console.log(recipes, 'recipes props data')
 
  const editRecipe = (recipe) => {
    setEditing(true);
    
    const edit = recipes.find((updatedRecipe)=>updatedRecipe.recipe_id=== recipe.recipe_id)
    setRecipeToEdit(edit);
    console.log(edit, 'edit variable');
  };


  const saveEdit = (e) => {
    const newRecipe={
      title: recipeToEdit.title,
      source: recipeToEdit.source,
      ingredients: recipeToEdit.ingredients,
      instructions: recipeToEdit.instructions,
      category: recipeToEdit.category,
    }
    e.preventDefault();
    // console.log(recipeToEdit, 'recipe to edit data')
    axiosWithAuth()
      .put(`/${id}/recipe/${recipeToEdit.recipe_id}`, newRecipe)
      .then(res => {
        console.log(res, 'edit data returned')
        setEditing(false);
        push(`/${id}/recipe/`)
        reloadPage();
      })
      .catch(err=>console.log(err, 'edited recipe failed to return', recipeToEdit.recipe_id))
  };

  const deleteRecipe = (recipe) => {
    axiosWithAuth() //unsure about endpoint for mapping through data
      .delete(`/${id}/recipe/${recipe.recipe_id}`, recipe)
      .then(res => {
        console.log("recipe has been returned", res)
        
      reloadPage(); 
    })
    
      .catch((err) => console.log(err, "sorry, recipe could not be returned"));
  };


  const editOnChange = e =>{
    setRecipeToEdit({
      ...recipeToEdit,
     [e.target.name]:e.target.value
    })
  }

  const onChange = 
    (e) =>{
      const recipeValue = e.target.value
                setNewRecipe({
                  ...newRecipe,
                 [e.target.name]:recipeValue
                })
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.category}</p>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <p>{recipe.source}</p>

          <button className='btn'
            onClick={() => {
              deleteRecipe(recipe);
            }}
          >
            Delete
          </button>
          <button className='btn'
            onClick={() => {
              editRecipe(recipe);
            }}
          >
            Edit
          </button>
        </div>
      ))}
      <div className="editForm">
        {editing && (
          <form onSubmit ={saveEdit}>
            <h3 className="edit-title">Edit Recipe </h3>
            <input
              name ="title"
              placeholder ="title"
              value={recipeToEdit.title}
              onChange ={editOnChange}
            />

            <input
              onChange={editOnChange}
              name="source"
              placeholder ="source"
              value={recipeToEdit.source}
            />

            <input
              onChange={editOnChange}
              name ="ingredients"
              placeholder ="ingredients"
              value={recipeToEdit.ingredients}
            />

            <input
              onChange={editOnChange}
              name ="instructions"
              placeholder ="instructions"
              value={recipeToEdit.instructions}
            />

            <input
               onChange={editOnChange}
               name ="category"
               placeholder ="category"
               value={recipeToEdit.category}
            />
            <button className='btn'
            type="submit">save</button>
            <button className='btn' onClick={() => setEditing(false)}>cancel</button>
          </form>
        )}
      </div>
    </div>
  );
        };

export default RecipesList;