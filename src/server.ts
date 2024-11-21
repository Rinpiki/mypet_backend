import express from "express";
import router from "./routes";
import "dotenv/config";
import path from "path";

const app = express();

app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.resolve("uploads")));

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
