import React, { useEffect, useState } from 'react';
import './Content.scss';
import { ContentProps, RecipeProps } from './Content.types';

const Content = ({selectedFood}: ContentProps): JSX.Element => {

  const [recipeList, setRecipeList] = useState<RecipeProps[]>([]);
 
  useEffect(() => {
    const apiKey = 'a681d478d3e54a2cbee852a14c29b9af';
    const searchTerm = selectedFood;

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=20`
    )
      .then(response => response.json())
      .then(data => {
        setRecipeList(data.results);
      })
      .catch(() => {
        console.log("error");
      })
  }, [selectedFood]);

  const removeRecipe = (recipeIndex: number): void => {
    let updatedData = [...recipeList];
    updatedData.splice(recipeIndex, 1);
    setRecipeList(updatedData);
  }

  const makeRecipeNameEditable = (recipeIndex: number): void => {
    let updatedData = [...recipeList];
    updatedData[recipeIndex].isEditable = true;
    setRecipeList(updatedData);
  }

  const editRecipeName = (event: React.ChangeEvent<HTMLInputElement>, recipeIndex: number): void => {
    let updatedData = [...recipeList];
    updatedData[recipeIndex].title = event.target.value;
    setRecipeList(updatedData);
  }

  const saveRecipeName = (recipeIndex: number): void => {
    let updatedData = [...recipeList];
    updatedData[recipeIndex].isEditable = false;
    setRecipeList(updatedData);
  }
 
  return (
    <div className="content">

      {recipeList && recipeList.map((recipes: RecipeProps, index: number) =>
         <div key={'recipe-' + recipes.id}>
           <div className="recipe-heading">

            {recipes.isEditable ? 
              <div className="recipe-title">
                <input 
                  className='recipe-title-input'
                  type="text" 
                  value={recipes.title}
                  onChange={(event) => editRecipeName(event, index)}
                />
                <div onClick={() => saveRecipeName(index)}>
                  <img
                    alt="Save"
                    className="save-icon" 
                    src={process.env.PUBLIC_URL + '/save-icon.svg'}
                  />
                </div>
              </div>
              : 
              <div className="recipe-title">
                <span className="recipe-title-text">{recipes.title}</span>
                <div onClick={() => makeRecipeNameEditable(index)}>
                  <img
                    alt="Edit"
                    className="pencil-icon" 
                    src={process.env.PUBLIC_URL + '/pencil-icon.svg'}
                  />
                 </div>
              </div>
            }

            <div onClick={() => removeRecipe(index)}>
              <img
                alt="Delete"
                className="cross-icon" 
                src={process.env.PUBLIC_URL + '/cross-icon.svg'}
              />
            </div>
          
           </div>

           <img 
            alt={recipes.title}
            className="recipe-image"
            src={recipes.image}
           />

         </div>
      )}

    </div>
  )
}

export default Content;
