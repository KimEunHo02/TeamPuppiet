const dummyFeeds = Array.from({ length: 214 }, (_, index) => ({
    id: index + 1,
    description: `Feed ${index + 1}`,
    image: `건식${index + 1}.jpg`,
  }));
  
  export default dummyFeeds;