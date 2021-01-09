const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi from Server");
});

const port = process.env.PORT || 3000;
if (port === 3000) {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
} else {
  app.listen(port);
}
