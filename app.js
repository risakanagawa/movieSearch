const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const app = express();

const schema = require("./schema/schema");

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;
app.listen(port, process.env.IP, function() {
  console.log(`listening on ${port}`);
});
