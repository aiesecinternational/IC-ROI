require("dotenv").config();
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean
} = require("graphql");

// Store AIESEC token in memory
let AIESEC_TOKEN = process.env.AIESEC_TOKEN;

// Function to refresh the AIESEC token every hour
/*const refreshAIESECToken = async () => {
    try {
        console.log("Refreshing AIESEC Token...");

        const response = await axios.post("https://auth.aiesec.org/oauth/token", {
            client_id: process.env.AIESEC_CLIENT_ID,
            client_secret: process.env.AIESEC_CLIENT_SECRET,
            grant_type: "client_credentials"
        });

        AIESEC_TOKEN = response.data.access_token;
        console.log("New AIESEC Token:", AIESEC_TOKEN);
    } catch (error) {
        console.error("Failed to refresh AIESEC Token:", error.response?.data || error.message);
    }
};

// Refresh the token every 1 hour (3600000 ms)
setInterval(refreshAIESECToken, 3600000);

// Refresh at startup
refreshAIESECToken();

// Function to get the latest token
const getAIESECToken = () => AIESEC_TOKEN;*/

// Define Programme Type
const ProgrammeType = new GraphQLObjectType({
  name: "Programme",
  fields: {
    short_name: { type: GraphQLString }
  }
});

// Define Programme Fee Type
const ProgrammeFeeType = new GraphQLObjectType({
  name: "ProgrammeFee",
  fields: {
    programme: { type: ProgrammeType }, // Reference the separate ProgrammeType
    fee: { type: GraphQLFloat },
    contract: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    enabled: { type: GraphQLBoolean },
    fee_for: { type: GraphQLString },
    mc_id: { type: GraphQLInt },
    lc_id: { type: GraphQLInt },
    programme_fee_max: { type: GraphQLFloat },
    programme_fee_min: { type: GraphQLFloat }
  }
});

// Define Programme Fees Type (to include total_count)
const ProgrammeFeesType = new GraphQLObjectType({
  name: "ProgrammeFees",
  fields: {
    nodes: { type: new GraphQLList(ProgrammeFeeType) },
    total_count: { type: GraphQLInt }
  }
});

// Define Committee Type
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: {
    name: { type: GraphQLString },
    programme_fees: { type: ProgrammeFeesType },
    project_fee_limit: { type: GraphQLFloat },
    project_fee_limit_cents: { type: GraphQLInt }
  }
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({  // ✅ Wrap fields in a function to avoid reference issues
    test: {
      type: GraphQLString,
      resolve: () => "GraphQL is working!"
    },
    committee: {
      type: CommitteeType,
      args: { id: { type: GraphQLInt } },
      resolve: async (_, args) => {
        try {
          //console.log("Using refreshed AIESEC_TOKEN in API request:", getAIESECToken());
            const response = await axios.post(
                "https://gis-api.aiesec.org/graphql",
                {
                  query: `
                  {
                    committee(id: ${args.id}) {
                      name
                      programme_fees(first: 29) {
                        nodes {
                          programme { short_name }
                          fee
                          contract
                          created_at
                          updated_at
                          enabled
                          fee_for
                          mc_id
                          lc_id
                          programme_fee_max
                          programme_fee_min
                        }
                        total_count
                      }
                      project_fee_limit
                      project_fee_limit_cents
                    }
                  }
                  `                  
                },
                {
                    headers: {
                        "Authorization": AIESEC_TOKEN,
                        "Content-Type": "application/json"
                    }
                }
            );
    
            return response.data.data.committee;
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
            throw new Error("Error fetching data: " + error.message);
        }
    }    
    }
  })
});

// Export GraphQL Schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
