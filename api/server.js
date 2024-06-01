const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getNasaImages = async (filters) => {
  const response = await axios.get("https://images-api.nasa.gov/search", {
    params: {
      q: filters.q,
      year_start: filters.yearStart,
      year_end: filters.yearEnd,
      media_type: filters.mediaType,
    },
  });
  return response.data.collection.items;
};

app.get("/search", async (req, res) => {
  const filters = req.query;
  try {
    const images = await getNasaImages(filters);
    res.json(images);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
