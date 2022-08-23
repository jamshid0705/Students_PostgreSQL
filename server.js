const app = require("./middlewares/app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} port sizni tingladi !`);
});
