import React from 'react';
import { useParams } from 'react-router-dom';

const ImageDetailFeed = () => {
  const { feedId } = useParams();

  return (
    <div>
      <h2>Feed 상세 페이지 - {feedId}</h2>
    </div>
  );
};

export default ImageDetailFeed;
