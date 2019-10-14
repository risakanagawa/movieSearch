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
const MovieListType = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
    Title: { type: GraphQLString },
    Year: { type: GraphQLString },
    Poster: { type: GraphQLString },
    imdbID: { type: GraphQLString }
  })
});

const MovieType = new GraphQLObjectType({
  name: "MovieRating",
  fields: () => ({
    Title: { type: GraphQLString },
    Released: { type: GraphQLString },
    Runtime: { type: GraphQLString },
    Genre: { type: GraphQLString },
    Actors: { type: GraphQLString },
    Plot: { type: GraphQLString },
    Poster: { type: GraphQLString },
    Awards: { type: GraphQLString },
    Country: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movies: {
      type: new GraphQLList(MovieListType),
      args: { searchTerm: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          const result = await axios.get(`http://www.omdbapi.com/?apikey=3b218ed3&type=movie&s=${args.searchTerm}`);
          return result.data.Search;
        } catch (e) {
          console.log(e);
          return e;
        }
        // return axios
        //   .get(
        //     `http://www.omdbapi.com/?apikey=3b218ed3&type=movie&s=star`
        //   )
        //   .then(res => {
        //     //   console.log(res.json())
        //     return res.data.Search;
        //   });
      }
    },
    movie: {
      type: MovieType,
      args: {
        imdbID: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`http://www.omdbapi.com/?apikey=3b218ed3&i=${args.imdbID}`)
          .then(res => {
            console.log("data!", res.data);
            return res.data;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
