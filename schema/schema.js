const apikey = "3b218ed3";
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

//Get movie, this is schema
const MovieType = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
    Title: { type: GraphQLString },
    Year: { type: GraphQLString },
    Poster: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios
          .get("http://www.omdbapi.com/?apikey=3b218ed3&s=star&type=movie")
          .then(res => {
            //   console.log(res.json())
            return res.data.Search;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
