const express = require("express");
const cors = require("cors");

const app = express();

//Config JSON responses
app.use(express.json());

//Solve CORS
app.use({ credentials: true, origin: "http://localhost:3000" });

//Public images folder
app.use(express.static("./public"));

//Routes

app.listen(5000);
