const { 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLList, 
  GraphQLFloat, 
  GraphQLBoolean 
} = require("graphql");

// Define MC Type
const MCType = new GraphQLObjectType({
  name: "MC",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    delegateFee: { type: GraphQLFloat },
    ticketFee: { type: GraphQLFloat },
    isHost: { type: GraphQLBoolean }
  }
});

// Define Calculation Response Type
const CalculationType = new GraphQLObjectType({
  name: "Calculation",
  fields: {
    totalCost: { type: GraphQLFloat }
  }
});

// Sample Data (Replace with DB Queries)
const MCs = [
  { id: 1, name: "MC USA", delegateFee: 300, ticketFee: 1200, isHost: false },
  { id: 2, name: "MC Canada", delegateFee: 280, ticketFee: 1000, isHost: false },
  { id: 3, name: "MC Egypt", delegateFee: 200, ticketFee: 800, isHost: true }
];

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    registeredMCs: {
      type: new GraphQLList(MCType),
      resolve() {
        return MCs;
      }
    }
  }
});

// Define Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    calculateData: {
      type: CalculationType,
      args: {
        mc_id: { type: GraphQLInt }
      },
      resolve(_, args) {
        const mc = MCs.find(mc => mc.id === args.mc_id);
        if (!mc) throw new Error("MC not found");

        // Calculation (Handled in frontend, but backend can still provide)
        const totalCost = mc.delegateFee + mc.ticketFee;
        return { totalCost };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
