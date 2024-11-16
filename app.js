import express from "express";
import bookingRoutes from "./routes/booking_router.mjs";
import { connectDB } from "./config/connectDB.mjs";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import ejsLocals from 'ejs-locals';  // Import ejs-local
// Kết nối cơ sở dữ liệu
connectDB();

const app = express();
const PORT = 3000; // Sửa thành PORT để đồng bộ

// Xác định __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware xử lý body và method override
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(bodyParser.json());

// Thiết lập layout cho EJS
app.engine('ejs', ejsLocals);  // Sử dụng ejs-locals

// Thiết lập view engine và views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("index.ejs");
});
// Routes
app.use("/api", bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
