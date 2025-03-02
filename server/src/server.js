import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./DB/connectDB.js";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const server = createServer(app);

// if (process.env.NODE_ENV === 'production') {
//   // Serve static files from client/build
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   // Handle all other routes and send back index.html for React Router to handle
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

app.get("*", (req,res) => {
  res.status(200).json({
    message: "hello from backend"
  })
})

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
