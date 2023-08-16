import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';

const ImageDetail = () => {
  const { recipeId } = useParams();

  const getImageFilePath = (recipeId) => {
    return {
      imagePath: `${process.env.PUBLIC_URL}/간식2/image (${recipeId}).png`,
      dataPath: `${process.env.PUBLIC_URL}/recipebom.json`,
    };
  };

  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);

  useEffect(() => {
    const imageInfo = getImageFilePath(recipeId);

    fetch(imageInfo.dataPath)
      .then((response) => response.json())
      .then((data) => {
        try {
          const recipe = data[recipeId - 1];
          if (recipe) {
            setRecipeName(recipe.레시피명);

            // Parse the ingredients string as JSON array
            const ingredientsString = recipe["재료 (고구마, 감자, 호박, 닭, 돼지, 소, 연어, 당근, 사과, 바나나, 꿀, 귀리, 우유, 요거트, 치즈, 달걀)"];
            const ingredientsArray = JSON.parse(ingredientsString.replace(/'/g, "\""));
            setRecipeIngredients(ingredientsArray);

            // Parse the recipe steps string as JSON array
            const stepsString = recipe.레시피;
            const stepsArray = JSON.parse(stepsString.replace(/'/g, "\""));
            setRecipeSteps(stepsArray);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }, [recipeId]);


  return (
    <div>
      <Logo />

      {/* 레시피 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative', border: 'solid #FFC9C9 7px' }}>
        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 0.8, backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center', marginLeft: '-20px' }}>
          {/* 이미지 */}
          <img
            src={`${process.env.PUBLIC_URL}/간식2/image (${recipeId}).png`}
            alt="레시피 이미지"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />

          {/* 레시피 이름 */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ width: '400px', margin: 'auto', marginBottom: '10px', fontSize: '25px' }}>{recipeName}</h3><br />
          </div>
        </div>

        {/* 세로 선 */}
        <div style={{ width: '2px', backgroundColor: '#FFC9C9' }}></div>


        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 텍스트 내용 */}
          <div style={{ marginBottom: '50px' }}>
            <strong style={{ fontSize: '30px', width: '240px', margin: 'auto', marginBottom: '10px' }}>재료</strong>
            <p style={{ marginTop: '12px' }}>
              {recipeIngredients.map((ingredient, index) => (
                <span key={index}>{ingredient}{index !== recipeIngredients.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
          </div>

          {/* 레시피 조리 순서 */}
          <div>
            <strong style={{ fontSize: '30px', width: '240px', margin: 'auto', marginBottom: '20px' }}>조리 순서</strong>
            <ol style={{ textAlign: 'left', marginTop: '12px' }}>
              {recipeSteps && recipeSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );


};

export default ImageDetail;
