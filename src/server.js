import "dotenv/config";
import app from "./app.js";
import connect from "./config/connection.js";


connect()

app.get("/", (req, res) => {
  res.send("Hello World!");
  
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
