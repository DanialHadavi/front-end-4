import React, { useState } from "react";
import "./App.css";

import Recipe from "./components/Recipe";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
} from "react-router-dom";

import { Login } from "./components/Login";
import Register from "./components/Register";
import RecipesList from "./components/RecipesList";

function App() {
  const [userId, setUserId] = useState("");
  let history = useHistory();

  return (
  <div>
        <Route exact path="/">
            <Login setUserId={setUserId} history={history} />
          </Route>
        <Route path="/register" component={Register} />
        <Route path ='/:id/recipe/:recipe_id' component ={RecipesList}/>
        <PrivateRoute exact path="/:id/recipe" component ={Recipe}/>
      
        </div>
  );
}

export default App;
