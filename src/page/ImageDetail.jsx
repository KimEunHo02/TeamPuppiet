import React from 'react';
import { useParams } from 'react-router-dom';

const ImageDetail = () => {
  const { recipeId } = useParams();

  return (
    <div>
      <h2>Recipe 상세 페이지 - {recipeId}</h2>
    </div>
  );
};

export default ImageDetail;
