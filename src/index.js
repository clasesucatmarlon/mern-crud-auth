import app from "./app.js";
import { PORT_SERVER } from "./config.js";
import  {connectDB}  from "./db.js";

const PORT = process.env.PORT || PORT_SERVER;

// DATA BASE
connectDB();

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to server");
})

app.listen(PORT);
console.log("Server conected on port: ", PORT)