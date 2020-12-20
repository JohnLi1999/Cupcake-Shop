export const filterByName = (cakeList, name) =>
  cakeList.filter(cake => cake.name === name);

export const filterByCategory = (cakeList, category) =>
  cakeList.filter(cake => cake.category === category);

export const filterByTag = (cakeList, tag) =>
  cakeList.filter(cake => cake.tags.includes(tag));
