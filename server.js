// Sources: 
// CRUD API REST: https://dev.to/suhailkakar/building-a-restful-crud-api-with-node-js-express-and-mongodb-1541
// https://medium.com/@rafaelbarbosadc/criando-uma-api-rest-com-node-js-express-mongoose-f75a27e8cdc1
// .env: https://www.npmjs.com/package/dotenv
// jwt-mongoose-mongodb: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./app/routes/app.routes");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,         
  useUnifiedTopology: true });

  console.log('Connected to MongoDB');

  mongoose.connection.on('error', (error) => {
    throw new Error(error);
  });

app.use(routes);

app.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({ message: "Internal error!" })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
