const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// GET a random Quote.
app.get("/api/quotes/random", (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

//GET all quotes or all quotes from an author.
app.get("/api/quotes", (req, res) => {
  const filterQuotes = quotes.filter((author) => {
    return author.person === req.query.person;
  });
  if (req.query.person) {
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

//POST for adding new quotes.
app.post("/api/quotes", (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newQuote != "" && newPerson != "") {
    quotes.push({ quote: newQuote, person: newPerson });
    res.send({ quote: { quote: newQuote, person: newPerson } });
  } else {
    res.sendStatus(400);
  }
});
app.listen(4001, () => console.log("Simple server running on http://localhost:4001"));
