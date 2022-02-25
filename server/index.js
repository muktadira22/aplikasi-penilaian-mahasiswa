const express = require("express");
const cors = require('cors')
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors())

app.post("/json-download", (req, res) => {
  const date = Date.now();

  try {
    const body = JSON.stringify(req.body).toString();
    res.status(200);
    res.set("Content-Disposition", `attachment; filename=${date}.json`);
    return res.json(body);
  } catch (e) {
    res.status(500);
    return res.json({
      status: "failed",
      message: "Data Mahasiswa Kosong",
    });
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
