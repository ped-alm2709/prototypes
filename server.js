// Sources: 
// CRUD API REST: https://dev.to/suhailkakar/building-a-restful-crud-api-with-node-js-express-and-mongodb-1541
// https://medium.com/@rafaelbarbosadc/criando-uma-api-rest-com-node-js-express-mongoose-f75a27e8cdc1
// .env: https://www.npmjs.com/package/dotenv
// jwt-mongoose-mongodb: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");
const bodyParser = require("body-parser");
const routes = require("./app/routes/app.routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.uri);

app.use("/employees", routes);

app.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({ message: "Internal error!" })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});