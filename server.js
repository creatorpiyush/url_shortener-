const express = require("express");
const mongoose = require("mongoose");

const ShortUrls = require("./models/shortUrl");

const app = express();

mongoose.connect(
  "mongodb+srv://url_shortener:url_shortener@cluster0.hiv9g.mongodb.net/url_shortener?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrls.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrls.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

const port = process.env.PORT || 3000;
if (port === 3000) {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
} else {
  app.listen(port);
}
