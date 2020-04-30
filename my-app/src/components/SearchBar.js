 import React, {useState, useEffect} from 'react';
 import axiosWithAuth from './utils/AxiosWithAuth';
 import { useParams } from 'react-router-dom';

 
 
 const SearchBar = (props)=>{
    const { id } = useParams(); 
     // const [title, setTitle] = useState('');
     const {recipes} = props;
     const {setRecipeList} = props; 
     const [searchTerm, setSearchTerm] = useState('');
     const [unfilteredRecipes, setUnfitleredRecipes] = useState(recipes);
     

     const changeHandler = e =>{
         e.persist(); 
         setSearchTerm(e.target.value)
     }

    //  const handleSubmit = e=>{
    //      e.preventDefault();
    //      return unfilteredRecipes.filter(recipe=>{
    //            if(searchTerm===""){
    //                return recipe
    //            }
    //            else if (recipe.title.includes(searchTerm) || recipe.category.includes(searchTerm)){
    //                return recipe
    //            }
    //  })}

    useEffect(() => {
        axiosWithAuth()
        .get(`/${id}/recipe/`)
        .then((res) => {
            console.log(res.data, 'res search data')
          setRecipeList( res.data.filter(recipe=> {
              console.log(recipe.title)
              console.log(recipe.category)
            if(searchTerm ==="")
            {
               
              return recipe
            }
            else if (
                recipe.title === searchTerm || recipe.category === searchTerm)
            {
                console.log(recipe.title.includes(searchTerm))
                console.log(recipe.category.includes(searchTerm))
              return recipe

            }
          }));
          console.log("recipe search data returned!", res);
        })
        .catch((err) => console.log("search data error in recipe", err)) 
        
      }, [searchTerm])


//     useEffect(()=>{
//     setRecipeList(
//       recipes.filter(recipe=>(
//        if(searchTerm===""){
//            return recipe
//        }
//     //    else if (recipe.title.includes(searchTerm))
//        else if (recipe.title.includes(searchTerm) || recipe.category.includes(searchTerm))
//                       return recipe
//                   })
//     },[searchTerm])
// }

 
// const changeHandler = e =>{
//   const searchTerm = e.target.value
//   setSearchTerm(searchTerm);
// }



 return(
   <div className="searchBar">
     <form>
     <input
      onChange ={changeHandler}
      type="text"
      placeholder="search"
      value ={searchTerm}
      />
        {/* <button onSubmit={handleSubmit}>Search</button> */}
     </form>
   </div>
 )
}
 
export default SearchBar; 