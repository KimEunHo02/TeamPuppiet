const dummyFeeds = Array.from({ length: 214 }, (_, index) => ({
  id: index + 1,
  description: `사료 이름 ${index + 1}`,
  image: `건식${index + 1}.jpg`,
}));

export default dummyFeeds;