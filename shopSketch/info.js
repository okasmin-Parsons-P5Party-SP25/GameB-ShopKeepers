const shopTypes = {
  plant: "plant",
  bakery: "bakery",
  books: "books",
};

const plantInventoryTypes = {
  plant:'plant',
  aloe:'aloe',
  tree:'tree'
};
const bookInventoryTypes = {
  book:'book',
  card:'card',
  notebook:'notebook'
};
const bakeryInventoryTypes = {
  bread: "bread",
  croissant: "croissant",
  chocolate_croissant: "chocolate_croissant",
  cookie: "cookie"
};

 const inventoryTypes = {
  plant: plantInventoryTypes,
  bakery: bakeryInventoryTypes,
  books: bookInventoryTypes
};

// constant across each shop type?
 const upgradeTypes = {
  light: "light",
  awning: "awning",
  secondFloor: "second floor",
};

 const upgradeOptions = {
  plant: [],
  bakery: [{type: upgradeTypes.light, cost: 10}, {type: upgradeTypes.awning, cost: 20}],
  books: [],
};
