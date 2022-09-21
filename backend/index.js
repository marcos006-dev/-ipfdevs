import express from "express";
import morgan from "morgan";
import cors from "cors";

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

const server = app.listen(app.get("port"), () => {
  console.log("Server is running on port 4000");
});

export { server, app };
