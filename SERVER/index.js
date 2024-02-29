const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");
const {mongoose} = require("mongoose");

let connect =()=>{
    mongoose.connect('mongodb+srv://harsha42703:kWKVAXXjC4YsPFwA@cluster0.uadl8xn.mongodb.net/').then(()=>{
      console.log("Connect")
    })
  }
  
  connect(); 

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 5000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});