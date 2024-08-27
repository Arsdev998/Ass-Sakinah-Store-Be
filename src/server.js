import app from "./app.js";
import dotenv from "dotenv";
import connect from "./config/connection.js";

dotenv.config();
connect()

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
