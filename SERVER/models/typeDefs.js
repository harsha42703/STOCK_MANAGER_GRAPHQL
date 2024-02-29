const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getitems: [product]
    getitembyitem(item: String!): product
    getitembyid(id:ID!): product
  }
  type product {
    id: ID
    item: String
    price: Int
    desc:Int
  }
  type Mutation{
    createItem(item:String!,price:Int!,desc:Int!):product
    updateItem(id:ID!,item:String!,price:Int!,desc:String!):product
    deleteItem(id:ID!):product
  }
`;

module.exports = { typeDefs };