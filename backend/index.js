import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/connection.js";
import { rutas } from "./routes/index.routes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 4000);

// RUTAS
app.use("/api", rutas());

const server = app.listen(app.get("port"), async () => {
  console.log("Server is running on port 4000");
  try {
    await connectDB();
  } catch (error) {
    throw new Error(error);
  }
});

export { server, app };
