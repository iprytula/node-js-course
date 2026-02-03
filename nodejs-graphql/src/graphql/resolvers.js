import products from "../data/products.js";
export const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((product) => product.id === id),
  },
  Mutation: {
    createProduct: (_, { name, description, inStock, price }) => {
      const newProduct = {
        id: crypto.randomUUID(),
        name,
        description,
        inStock,
        price,
      };
      products.push(newProduct);
      return newProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
    updateProduct: (_, { id, name, description, inStock, price }) => {
      const product = products.find((product) => product.id === id);
      if (!product) return null;
      if (name !== undefined) product.name = name;
      if (description !== undefined) product.description = description;
      if (inStock !== undefined) product.inStock = inStock;
      if (price !== undefined) product.price = price;
      return product;
    }
  },
};
export default resolvers;