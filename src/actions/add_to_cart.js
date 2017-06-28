export const addToCart = (item) => {
  console.log("adding ", item);
  return {
    type: 'add',
    item
  };
}
