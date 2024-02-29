const { Product } = require('./models/Products');

const resolvers = {
  Query: {
    getitems: async (parent,args) => {
      const products = await Product.find();
      return products;
    },

    getitembyitem: async (parent,args) => {
      const { item } = args;
      const product = await Product.findOne({item: item});
      if (!product) { throw new Error('No product found with this ID'); }
      return product;
    },

    getitembyid: async (parent,args) => {
      const { id } = args;
      const product = await Product.findById(id);
      if (!product) { throw new Error('No product found with this ID'); }
      return product;
    },
  },
  Mutation: {
    createItem: async (parent, args) => {
      const { item, price, desc } = args;
      const newProduct = new Product({ 
        item,
        price,
        desc,
      });
      await newProduct.save();
      return newProduct;
    },

    updateItem: async (parent, args) => {
      const { id, item, price, desc } = args;
      const updatedProduct = await Product.findByIdAndUpdate(id, {id, item, price, desc });
      if(!updatedProduct){throw new Error('No product found with this ID');}
      return updatedProduct;
    },

    deleteItem: async (parent, args) => {
      const { id } = args;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if(!deletedProduct){throw new Error('No product found with this ID');}
      return deletedProduct;
    },
  },
};

module.exports = { resolvers };
