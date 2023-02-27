const express = require("express");
const colors = require('colors');
const app = express();

app.listen(5000, () => {
    console.log(colors.yellow.underline(`Server Succesfully running on http://localhost:5000`));
});
